'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
  playClick: () => void;
  playTransition: () => void;
}

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => { },
  setEnabled: () => { },
  playClick: () => { },
  playTransition: () => { },
});

/* ═════════════ HIGH-ENERGY EDM-POP CONFIG ═════════════ */

const BPM = 128;
const STEP = 60 / BPM / 4;          // 16th note
const BAR = STEP * 16;
const MASTER_VOLUME = 0.3;
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// F – G – Am – Am  (classic festival-pop progression)
const CHORDS = [
  { root: 29, notes: [65, 69, 72, 77] }, // F
  { root: 31, notes: [67, 71, 74, 79] }, // G
  { root: 33, notes: [69, 72, 76, 81] }, // Am
  { root: 33, notes: [69, 72, 76, 84] }, // Am (lift)
];

// Original 4-bar lead hook (null = rest)
const _ = null;
const HOOK: (number | null)[][] = [
  [72, _, 76, _, 77, _, 76, 72, _, 74, _, 72, 74, _, 76, _],
  [74, _, 79, _, 77, _, 76, 74, _, 71, _, 74, 76, _, 74, _],
  [76, _, 81, _, 79, _, 76, _, 77, _, 76, _, 74, _, 72, _],
  [72, _, _, 76, _, _, 79, _, 81, _, 79, _, 76, _, 84, _],
];

// Syncopated pop chord stabs in the drop
const STABS = [0, 3, 6, 8, 11, 14];
// Offbeat "growl" bass (step → semitone offset)
const GROWL: Record<number, number> = { 2: 0, 6: 0, 7: 12, 10: 0, 14: 0, 15: 12 };

interface AudioGraph {
  ctx: AudioContext;
  master: GainNode;     // drums go here
  pump: GainNode;       // music bus with sidechain pumping
  delaySend: GainNode;
  noise: AudioBuffer;
  drive: Float32Array;  // distortion curve
}

/* ═════════════ Instruments ═════════════ */

function sidechain(g: AudioGraph, t: number) {
  const p = g.pump.gain;
  p.setValueAtTime(0.2, t);
  p.linearRampToValueAtTime(1, t + STEP * 2.2);
}

function kick(g: AudioGraph, t: number, big = false) {
  const { ctx, master } = g;
  // body + sub
  const o = ctx.createOscillator(), v = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(big ? 220 : 180, t);
  o.frequency.exponentialRampToValueAtTime(48, t + 0.07);
  o.frequency.exponentialRampToValueAtTime(40, t + 0.4);
  v.gain.setValueAtTime(1.2, t);
  v.gain.exponentialRampToValueAtTime(0.001, t + (big ? 0.7 : 0.42));
  o.connect(v).connect(master);
  o.start(t); o.stop(t + 0.75);
  // click transient
  const n = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), nv = ctx.createGain();
  n.buffer = g.noise;
  hp.type = 'highpass'; hp.frequency.value = 3000;
  nv.gain.setValueAtTime(0.35, t);
  nv.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
  n.connect(hp).connect(nv).connect(master);
  n.start(t); n.stop(t + 0.02);
}

function clap(g: AudioGraph, t: number, vol = 0.5) {
  const { ctx, master, noise } = g;
  const src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), v = ctx.createGain();
  src.buffer = noise;
  bp.type = 'bandpass'; bp.frequency.value = 1500; bp.Q.value = 0.9;
  v.gain.setValueAtTime(0.0001, t);
  // three quick hits = real clap texture
  [0, 0.011, 0.022].forEach((d) => {
    v.gain.setValueAtTime(vol, t + d);
    v.gain.exponentialRampToValueAtTime(vol * 0.2, t + d + 0.009);
  });
  v.gain.setValueAtTime(vol * 0.8, t + 0.03);
  v.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  src.connect(bp).connect(v).connect(master);
  src.start(t); src.stop(t + 0.25);
}

function snare(g: AudioGraph, t: number, vol: number) {
  const { ctx, master, noise } = g;
  const src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), v = ctx.createGain();
  src.buffer = noise;
  bp.type = 'bandpass'; bp.frequency.value = 2200;
  v.gain.setValueAtTime(vol, t);
  v.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  src.connect(bp).connect(v).connect(master);
  src.start(t); src.stop(t + 0.12);
}

function hat(g: AudioGraph, t: number, open: boolean, vol: number) {
  const { ctx, master, noise } = g;
  const src = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), v = ctx.createGain();
  src.buffer = noise;
  hp.type = 'highpass'; hp.frequency.value = open ? 6500 : 8500;
  const len = open ? 0.18 : 0.035;
  v.gain.setValueAtTime(vol, t);
  v.gain.exponentialRampToValueAtTime(0.001, t + len);
  src.connect(hp).connect(v).connect(master);
  src.start(t); src.stop(t + len + 0.01);
}

function crash(g: AudioGraph, t: number) {
  const { ctx, master, noise } = g;
  const src = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), v = ctx.createGain();
  src.buffer = noise; src.loop = true;
  hp.type = 'highpass'; hp.frequency.value = 4500;
  v.gain.setValueAtTime(0.32, t);
  v.gain.exponentialRampToValueAtTime(0.001, t + 2);
  src.connect(hp).connect(v).connect(master);
  src.start(t); src.stop(t + 2.05);
}

function riser(g: AudioGraph, t: number, dur: number) {
  const { ctx, master, noise } = g;
  const src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), v = ctx.createGain();
  src.buffer = noise; src.loop = true;
  bp.type = 'bandpass'; bp.Q.value = 2;
  bp.frequency.setValueAtTime(300, t);
  bp.frequency.exponentialRampToValueAtTime(9000, t + dur);
  v.gain.setValueAtTime(0.0001, t);
  v.gain.exponentialRampToValueAtTime(0.28, t + dur - 0.02);
  v.gain.linearRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(v).connect(master);
  src.start(t); src.stop(t + dur + 0.02);
  // rising pitch sweep
  const o = ctx.createOscillator(), ov = ctx.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(1760, t + dur);
  ov.gain.setValueAtTime(0.0001, t);
  ov.gain.exponentialRampToValueAtTime(0.05, t + dur - 0.02);
  ov.gain.linearRampToValueAtTime(0.0001, t + dur);
  o.connect(ov).connect(master);
  o.start(t); o.stop(t + dur + 0.02);
}

// Deep sub that pumps with the kick
function sub(g: AudioGraph, t: number, note: number) {
  const { ctx, pump } = g;
  const o = ctx.createOscillator(), v = ctx.createGain();
  o.type = 'sine'; o.frequency.value = midi(note);
  v.gain.setValueAtTime(0.0001, t);
  v.gain.linearRampToValueAtTime(0.55, t + 0.01);
  v.gain.setValueAtTime(0.55, t + BAR - 0.05);
  v.gain.linearRampToValueAtTime(0.0001, t + BAR);
  o.connect(v).connect(pump);
  o.start(t); o.stop(t + BAR + 0.02);
}

// Distorted mid-bass so the bass is heard even on laptop/phone speakers
function growl(g: AudioGraph, t: number, note: number) {
  const { ctx, pump, drive } = g;
  const dur = STEP * 1.4;
  const o1 = ctx.createOscillator(), o2 = ctx.createOscillator();
  const ws = ctx.createWaveShaper(), lp = ctx.createBiquadFilter(), v = ctx.createGain();
  o1.type = 'sawtooth'; o1.frequency.value = midi(note);
  o2.type = 'square'; o2.frequency.value = midi(note); o2.detune.value = 9;
  ws.curve = new Float32Array(drive); ws.oversample = '2x';
  lp.type = 'lowpass'; lp.Q.value = 8;
  lp.frequency.setValueAtTime(2200, t);
  lp.frequency.exponentialRampToValueAtTime(250, t + dur);
  v.gain.setValueAtTime(0.0001, t);
  v.gain.linearRampToValueAtTime(0.16, t + 0.005);
  v.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o1.connect(ws); o2.connect(ws);
  ws.connect(lp).connect(v).connect(pump);
  o1.start(t); o2.start(t); o1.stop(t + dur + 0.02); o2.stop(t + dur + 0.02);
}

// Supersaw chord: 3 detuned saws per note
function supersaw(g: AudioGraph, t: number, notes: number[], dur: number, cutoff: number, vol: number) {
  const { ctx, pump } = g;
  const lp = ctx.createBiquadFilter(), v = ctx.createGain();
  lp.type = 'lowpass'; lp.frequency.value = cutoff; lp.Q.value = 1;
  v.gain.setValueAtTime(0.0001, t);
  v.gain.linearRampToValueAtTime(vol, t + 0.006);
  v.gain.exponentialRampToValueAtTime(vol * 0.5, t + dur * 0.6);
  v.gain.linearRampToValueAtTime(0.0001, t + dur);
  lp.connect(v).connect(pump);
  notes.forEach((n) => {
    [-14, 0, 14].forEach((d) => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth'; o.frequency.value = midi(n); o.detune.value = d;
      o.connect(lp);
      o.start(t); o.stop(t + dur + 0.02);
    });
  });
}

function lead(g: AudioGraph, t: number, note: number, big: boolean) {
  const { ctx, pump, delaySend } = g;
  const dur = STEP * 1.8;
  const lp = ctx.createBiquadFilter(), v = ctx.createGain();
  lp.type = 'lowpass'; lp.Q.value = 3;
  lp.frequency.setValueAtTime(big ? 6000 : 3500, t);
  lp.frequency.exponentialRampToValueAtTime(900, t + dur);
  v.gain.setValueAtTime(0.0001, t);
  v.gain.linearRampToValueAtTime(big ? 0.09 : 0.07, t + 0.004);
  v.gain.exponentialRampToValueAtTime(0.001, t + dur);
  lp.connect(v);
  v.connect(pump); v.connect(delaySend);
  const voices: [OscillatorType, number, number][] = big
    ? [['sawtooth', 0, -10], ['sawtooth', 0, 10], ['square', 12, 0]]
    : [['sawtooth', 0, 0]];
  voices.forEach(([type, oct, det]) => {
    const o = ctx.createOscillator();
    o.type = type; o.frequency.value = midi(note + oct); o.detune.value = det;
    o.connect(lp);
    o.start(t); o.stop(t + dur + 0.02);
  });
}

/* ═════════════ Provider ═════════════ */

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const enabledRef = useRef(false);
  const graphRef = useRef<AudioGraph | null>(null);
  const timerRef = useRef<number | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const nextTimeRef = useRef(0);

  const getGraph = useCallback((): AudioGraph | null => {
    if (typeof window === 'undefined') return null;
    if (graphRef.current) return graphRef.current;
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return null;

    const ctx = new AudioCtxClass();

    // master -> glue compressor -> limiter -> speakers
    const glue = ctx.createDynamicsCompressor();
    glue.threshold.value = -16; glue.ratio.value = 4; glue.attack.value = 0.01; glue.release.value = 0.15;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3; limiter.ratio.value = 20; limiter.attack.value = 0.002; limiter.release.value = 0.08;
    glue.connect(limiter).connect(ctx.destination);

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.connect(glue);

    // music bus (ducked by the kick)
    const pump = ctx.createGain();
    pump.gain.value = 1;
    pump.connect(master);

    // dotted-8th echo for the lead
    const delaySend = ctx.createGain(); delaySend.gain.value = 0.3;
    const delay = ctx.createDelay(1); delay.delayTime.value = STEP * 3;
    const fb = ctx.createGain(); fb.gain.value = 0.35;
    const dlp = ctx.createBiquadFilter(); dlp.type = 'lowpass'; dlp.frequency.value = 3000;
    delaySend.connect(delay);
    delay.connect(dlp).connect(fb).connect(delay);
    dlp.connect(pump);

    // 2s white noise
    const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

    // soft-clip distortion curve
    const drive = new Float32Array(1024);
    for (let i = 0; i < drive.length; i++) {
      const x = (i / (drive.length - 1)) * 2 - 1;
      drive[i] = Math.tanh(x * 4);
    }

    graphRef.current = { ctx, master, pump, delaySend, noise, drive };
    return graphRef.current;
  }, []);

  /*
   * Song structure:
   *   bars 0–3   : INTRO  (filtered chords, hats)
   *   then loop of 16 bars:
   *     0–3  BUILD  (snare roll, riser, filter opens, silence before drop)
   *     4–11 DROP   (kick, sidechain, heavy bass, supersaw stabs, big lead)
   *     12–15 BREAK (chords + lead, breathing room)
   */
  const scheduleStep = useCallback((g: AudioGraph, step: number, t: number) => {
    const bar = Math.floor(step / 16);
    const s = step % 16;
    const chord = CHORDS[bar % 4];
    const hookNote = HOOK[bar % 4][s];

    let section: 'intro' | 'build' | 'drop' | 'break';
    let sb: number;
    if (bar < 4) { section = 'intro'; sb = bar; }
    else {
      const c = (bar - 4) % 16;
      if (c < 4) { section = 'build'; sb = c; }
      else if (c < 12) { section = 'drop'; sb = c - 4; }
      else { section = 'break'; sb = c - 12; }
    }

    // reset pump in sections without kick
    if (s === 0 && section !== 'drop') g.pump.gain.setValueAtTime(1, t);

    // dramatic silence right before the drop
    if (section === 'build' && sb === 3 && s >= 14) return;

    switch (section) {
      case 'intro': {
        if (s === 0) supersaw(g, t, chord.notes, BAR, 700 + sb * 250, 0.035);
        if (sb >= 2 && s % 4 === 2) hat(g, t, true, 0.07);
        if (sb >= 1 && s % 2 === 0) hat(g, t, false, 0.04);
        break;
      }
      case 'build': {
        if (s === 0 && sb === 0) riser(g, t, BAR * 4 - STEP * 2);
        if (s === 0) supersaw(g, t, chord.notes, BAR, 1000 + sb * 900, 0.04);
        if (sb < 2 && s % 4 === 0) { kick(g, t); }
        const every = [4, 4, 2, 1][sb];
        if (s % every === 0) {
          const progress = (sb * 16 + s) / 64;
          snare(g, t, 0.08 + progress * 0.35);
        }
        if (s % 2 === 0) hat(g, t, false, 0.05);
        if (hookNote !== null && sb >= 2) lead(g, t, hookNote, false);
        break;
      }
      case 'drop': {
        if (sb === 0 && s === 0) { crash(g, t); kick(g, t, true); sidechain(g, t); }
        else if (s % 4 === 0) { kick(g, t); sidechain(g, t); }

        if (s === 4 || s === 12) clap(g, t);
        if (sb % 4 === 3 && s >= 12) clap(g, t, 0.25 + (s - 12) * 0.08); // fill

        hat(g, t, false, s % 2 ? 0.07 : 0.035);
        if (s % 4 === 2) hat(g, t, true, 0.09);

        if (s === 0) sub(g, t, chord.root);
        if (s in GROWL) growl(g, t, chord.root + 12 + GROWL[s]);

        if (STABS.includes(s)) supersaw(g, t, chord.notes, STEP * 2.5, 5200, 0.06);
        if (hookNote !== null) lead(g, t, hookNote, true);
        break;
      }
      case 'break': {
        if (s === 0) supersaw(g, t, chord.notes, BAR, 1800, 0.045);
        if (s === 0) sub(g, t, chord.root);
        if (s % 4 === 2) hat(g, t, true, 0.06);
        if (s === 4 || s === 12) clap(g, t, 0.3);
        if (hookNote !== null) lead(g, t, hookNote, false);
        break;
      }
    }
  }, []);

  const scheduler = useCallback(() => {
    const g = graphRef.current;
    if (!g) return;
    const now = g.ctx.currentTime;
    // if the tab was throttled in the background, jump ahead instead of a burst
    if (nextTimeRef.current < now) nextTimeRef.current = now + 0.05;
    while (nextTimeRef.current < now + 0.12) {
      scheduleStep(g, stepRef.current, nextTimeRef.current);
      nextTimeRef.current += STEP;
      stepRef.current++;
    }
  }, [scheduleStep]);

  const startMusic = useCallback((g: AudioGraph) => {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    if (timerRef.current) return;
    stepRef.current = 0;
    nextTimeRef.current = g.ctx.currentTime + 0.05;
    timerRef.current = window.setInterval(scheduler, 25);
  }, [scheduler]);

  const stopMusicLater = useCallback(() => {
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    stopTimeoutRef.current = window.setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      stopTimeoutRef.current = null;
    }, 900);
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    const g = getGraph();
    if (!g) return;
    const { ctx, master } = g;
    if (ctx.state === 'suspended') ctx.resume();

    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), ctx.currentTime);
    if (v) {
      startMusic(g);
      master.gain.linearRampToValueAtTime(MASTER_VOLUME, ctx.currentTime + 0.6);
    } else {
      master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
      stopMusicLater();
    }

    enabledRef.current = v;
    setEnabledState(v);
    try { localStorage.setItem('arjun-sound', String(v)); } catch { }
  }, [getGraph, startMusic, stopMusicLater]);

  const toggle = useCallback(() => {
    setEnabled(!enabledRef.current);
  }, [setEnabled]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      graphRef.current?.ctx.close().catch(() => { });
      graphRef.current = null;
    };
  }, []);

  const playClick = useCallback(() => {
    const ctx = graphRef.current?.ctx;
    if (!enabled || !ctx) return;
    try {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      g.gain.setValueAtTime(0.04, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    } catch { }
  }, [enabled]);

  const playTransition = useCallback(() => {
    const ctx = graphRef.current?.ctx;
    if (!enabled || !ctx) return;
    try {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.35);
      g.gain.setValueAtTime(0.05, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    } catch { }
  }, [enabled]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, setEnabled, playClick, playTransition }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}