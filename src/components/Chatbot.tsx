'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, User, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { suggestedQuestions } from '@/data/portfolioData';
import { getBotResponse, ChatMessage } from '@/lib/chatbotEngine';

const FormattedMessage = ({ content }: { content: string }) => {
  const renderBoldText = (text: string): React.ReactNode[] => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
      parts.push(<strong key={match.index} className="font-semibold text-white">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    if (lastIndex < text.length) parts.push(text.substring(lastIndex));
    return parts;
  };

  const renderFormattedText = (text: string): React.ReactNode[] => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(...renderBoldText(text.substring(lastIndex, match.index)));
      parts.push(<a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-[#19C3B1] underline underline-offset-2 hover:text-[#8BE9DF] transition-colors">{match[1]}</a>);
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < text.length) parts.push(...renderBoldText(text.substring(lastIndex)));
    return parts;
  };

  return (
    <div className="whitespace-pre-wrap leading-relaxed text-sm">
      {content.split('\n').map((line, idx, arr) => (
        <span key={idx}>{renderFormattedText(line)}{idx < arr.length - 1 && <br />}</span>
      ))}
    </div>
  );
};

const WaveIcon = () => (
  <div className="flex items-end gap-[3px] h-5">
    {[3, 5, 8, 5, 3].map((h, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-[#07090C]"
        animate={{ height: [`${h}px`, `${h * 2.2}px`, `${h}px`] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    content: `Hello! I am Arjun's AI Portfolio Assistant.\n\nI can answer questions about his **experience**, **projects**, **skills**, and how to **contact** him.\n\nFeel free to ask or pick a suggestion below!`,
    isUser: false,
    timestamp: new Date(),
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeChips, setActiveChips] = useState<string[]>(suggestedQuestions.slice(0, 4));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const getContextualFollowUps = (q: string): string[] => {
    const lq = q.toLowerCase();
    if (lq.includes('hydrapay')) return ['What does Arjun do at D-Table?', "Arjun's top skills?", 'Show his projects', 'Contact Arjun?'];
    if (lq.includes('d-table') || lq.includes('analytics')) return ['Tell me about HydraPay', "Arjun's top skills?", 'Educational background?', 'Contact Arjun?'];
    if (lq.includes('skill')) return ['Tell me about HydraPay', 'What does Arjun do at D-Table?', 'Show his projects', 'Contact Arjun?'];
    return ['Tell me about HydraPay', 'What does Arjun do at D-Table?', "Arjun's top skills?", 'Contact Arjun?'];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), content: text, isUser: true, timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);
    try {
      let botReply = '';
      try {
        const res = await fetch('/api/chatbot/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: text, history: messages.slice(-4) }) });
        if (res.ok) { const d = await res.json(); if (d.answer) botReply = d.answer; }
      } catch {}
      if (!botReply) botReply = getBotResponse(text, messages);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), content: botReply, isUser: false, timestamp: new Date() }]);
      setActiveChips(getContextualFollowUps(text));
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), content: "I am having trouble right now. Email Arjun at arjunrajawat28@gmail.com!", isUser: false, timestamp: new Date() }]);
    } finally { setIsTyping(false); }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };

  const panelStyle: React.CSSProperties = {
    background: 'rgba(11, 14, 18, 0.97)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(25, 195, 177, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(25,195,177,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.7, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => setIsOpen(true)} aria-label="Open AI Assistant"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full focus:outline-none"
            style={{ background: 'linear-gradient(135deg, #19C3B1 0%, #0fa898 100%)', border: '1px solid rgba(139,233,223,0.4)', boxShadow: '0 0 30px rgba(25,195,177,0.35)' }}
          >
            <WaveIcon />
            <span className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#07090C]" style={{ fontFamily: "'Space Mono', monospace" }}>Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col w-[92vw] max-w-[420px] h-[620px] max-h-[88vh]"
            style={panelStyle}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: '1px solid rgba(25,195,177,0.12)', background: 'rgba(25,195,177,0.03)', borderRadius: '16px 16px 0 0' }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: 'linear-gradient(135deg, #19C3B1 0%, #0fa898 100%)', boxShadow: '0 0 16px rgba(25,195,177,0.4)' }}>
                  <Sparkles className="w-4 h-4 text-[#07090C]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>Arjun's Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(139,233,223,0.7)', fontFamily: "'Space Mono', monospace" }}>Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close" className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={cn('flex gap-2.5 items-end', msg.isUser ? 'justify-end' : 'justify-start')}>
                  {!msg.isUser && (
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mb-0.5" style={{ background: 'rgba(25,195,177,0.15)', border: '1px solid rgba(25,195,177,0.3)' }}>
                      <Sparkles className="w-3 h-3 text-[#19C3B1]" />
                    </div>
                  )}
                  <div
                    className={cn('max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm', msg.isUser ? 'rounded-br-sm' : 'rounded-bl-sm')}
                    style={msg.isUser
                      ? { background: 'rgba(25,195,177,0.18)', border: '1px solid rgba(25,195,177,0.35)', color: '#F2F5F4' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(242,245,244,0.85)' }}
                  >
                    <FormattedMessage content={msg.content} />
                    <p className="mt-1.5 text-[10px] text-right" style={{ color: msg.isUser ? 'rgba(139,233,223,0.6)' : 'rgba(255,255,255,0.25)', fontFamily: "'Space Mono', monospace" }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.isUser && (
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mb-0.5" style={{ background: 'rgba(25,195,177,0.15)', border: '1px solid rgba(25,195,177,0.3)' }}>
                      <User className="w-3 h-3 text-[#19C3B1]" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-end">
                  <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center" style={{ background: 'rgba(25,195,177,0.15)', border: '1px solid rgba(25,195,177,0.3)' }}>
                    <Sparkles className="w-3 h-3 text-[#19C3B1]" />
                  </div>
                  <div className="rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center gap-1.5">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#19C3B1' }}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chips */}
            <div className="px-4 pt-3 pb-2 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3 h-3 text-[#19C3B1]" />
                <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(139,233,223,0.6)', fontFamily: "'Space Mono', monospace" }}>Suggestions</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar">
                {activeChips.map((chip, idx) => (
                  <button key={idx} onClick={() => handleSendMessage(chip)} disabled={isTyping}
                    className="text-[11px] px-3 py-1.5 rounded-full transition-all disabled:opacity-40 hover:bg-[rgba(25,195,177,0.15)] hover:border-[rgba(25,195,177,0.5)]"
                    style={{ background: 'rgba(25,195,177,0.07)', border: '1px solid rgba(25,195,177,0.2)', color: 'rgba(139,233,223,0.85)', fontFamily: "'Space Mono', monospace" }}>
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-3 shrink-0" style={{ borderTop: '1px solid rgba(25,195,177,0.1)' }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(25,195,177,0.2)' }}>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..." disabled={isTyping}
                  className="flex-1 bg-transparent text-sm outline-none text-white/85 disabled:opacity-50"
                  style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(242,245,244,0.85)' }}
                />
                <motion.button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping}
                  whileTap={{ scale: 0.9 }} aria-label="Send"
                  className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-all disabled:opacity-30"
                  style={{ background: 'linear-gradient(135deg, #19C3B1 0%, #0fa898 100%)', boxShadow: inputValue.trim() ? '0 0 14px rgba(25,195,177,0.4)' : 'none' }}>
                  <Send className="w-3.5 h-3.5 text-[#07090C]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
