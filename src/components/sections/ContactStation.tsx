'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { personalInfo } from '@/data/portfolioData';
import { Mail, Linkedin, Github, MessageCircle, Send, CheckCircle, FileText } from 'lucide-react';

export default function ContactStation() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
      setFormData({ name: '', email: '', message: '' });
    }, 700);
  };

  const whatsappUrl = `https://wa.me/917509245769`;

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 lg:px-16 flex items-center justify-center"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-[0.3em] text-white font-normal uppercase inline-block border-b border-white/20 pb-3">
            {t.contact.heading}
          </h2>
          <p className="font-serif text-sm sm:text-base leading-relaxed text-white/70 italic">
            &ldquo;{t.contact.intro}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Direct Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-lg bg-[#0e0e12]/80 border border-white/10 hover:border-emerald-500/50 flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  {t.contact.whatsappLabel}
                </span>
                <span className="font-serif text-base text-white group-hover:text-emerald-400 transition-colors">
                  +91-7509245769
                </span>
              </div>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-5 rounded-lg bg-[#0e0e12]/80 border border-white/10 hover:border-white/30 flex items-center gap-4 group transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  {t.contact.email}
                </span>
                <span className="font-serif text-sm sm:text-base text-white group-hover:text-[#8BE9DF] transition-colors truncate block">
                  {personalInfo.email}
                </span>
              </div>
            </a>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#0e0e12]/80 border border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-2 group transition-all">
                <Linkedin className="w-5 h-5 text-white/60 group-hover:text-white" />
                <span className="font-mono text-[10px] text-white/50 tracking-wider">LINKEDIN</span>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#0e0e12]/80 border border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-2 group transition-all">
                <Github className="w-5 h-5 text-white/60 group-hover:text-white" />
                <span className="font-mono text-[10px] text-white/50 tracking-wider">GITHUB</span>
              </a>
              <a href="https://drive.google.com/file/d/1nwLvNGVSfoLy8ToAHyoC8FF12CWyE1C8/view"
                target="_blank" rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#0e0e12]/80 border border-white/10 hover:border-white/30 flex flex-col items-center justify-center gap-2 group transition-all">
                <FileText className="w-5 h-5 text-white/60 group-hover:text-white" />
                <span className="font-mono text-[10px] text-white/50 tracking-wider">{t.contact.resumeLabel}</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-xl bg-[#0e0e12]/90 border border-white/15">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                    {t.contact.name}
                  </label>
                  <input type="text" required value={formData.name}
                    placeholder={t.contact.namePlaceholder || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded px-4 py-3 text-sm font-mono text-white outline-none transition-colors placeholder:text-white/20" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                    {t.contact.email}
                  </label>
                  <input type="email" required value={formData.email}
                    placeholder={t.contact.emailPlaceholder || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded px-4 py-3 text-sm font-mono text-white outline-none transition-colors placeholder:text-white/20" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/60 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea required rows={4} value={formData.message}
                    placeholder={t.contact.messagePlaceholder || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded px-4 py-3 text-sm font-mono text-white outline-none transition-colors resize-none placeholder:text-white/20" />
                </div>
                <button type="submit" disabled={status === 'sending'}
                  className="w-full frosted-pill-btn py-3 mt-2 text-xs">
                  {status === 'sending' ? (
                    t.contact.sending
                  ) : status === 'sent' ? (
                    <span className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-4 h-4" /> {t.contact.success}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      {t.contact.send}
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
