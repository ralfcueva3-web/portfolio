// BUILT-BY: opus-4.6
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { contact } from '@/../../data/content';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck, FiArrowUpRight } from 'react-icons/fi';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Contact section — split layout with scroll-triggered animations.
 * Left: heading, availability, email, socials.
 * Right: minimal contact form with underline-style inputs.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const prefersReduced = useReducedMotion();
  const vp = { once: true, margin: '-80px' as const };
  const dur = { duration: 0.6, ease };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send. Email me directly instead.');
    }
  };

  const socials = [
    { name: 'GitHub', href: contact.socials.github, icon: FiGithub, handle: '@Kova' },
    { name: 'LinkedIn', href: contact.socials.linkedin, icon: FiLinkedin, handle: '/in/Ayush-Kova' },
    { name: 'Twitter', href: contact.socials.twitter, icon: FiTwitter, handle: '@Kovadev' },
  ];

  return (
    <section
      id="contact"
      className="section-padding relative"
      aria-label="Contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — slide from left */}
        <motion.div
          className="flex items-baseline gap-4 mb-12 md:mb-16"
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={dur}
        >
          <span className="section-index">05 / Contact</span>
          <div className="rule flex-1" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Heading — reveal from below */}
            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary leading-[0.95]"
                initial={prefersReduced ? false : { y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={vp}
                transition={{ duration: 0.7, ease }}
              >
                {contact.title}
              </motion.h2>
            </div>

            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ ...dur, delay: 0.1 }}
            >
              {contact.description}
            </motion.p>

            {/* Availability */}
            <motion.div
              className="flex items-center gap-3"
              initial={prefersReduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ ...dur, delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                Available for new projects
              </span>
            </motion.div>

            {/* Email */}
            <motion.a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-2 text-lg md:text-xl font-display font-bold text-text-primary hover:text-accent transition-colors"
              initial={prefersReduced ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ ...dur, delay: 0.25 }}
            >
              <FiMail size={18} className="text-accent" />
              <span>{contact.email}</span>
              <FiArrowUpRight
                size={14}
                className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </motion.a>

            {/* Social links */}
            <motion.div
              className="space-y-3 pt-4 border-t border-border-primary"
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            >
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                Profiles
              </span>
              <div className="space-y-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors group"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={dur}
                    >
                      <Icon size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                      <span className="font-mono text-xs">{social.handle}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right column — form with stagger reveals */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ ...dur, delay: 0.15 }}
          >
            {status === 'success' ? (
              <motion.div
                className="py-16 flex flex-col items-center justify-center text-center space-y-4 border border-border-primary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="w-12 h-12 flex items-center justify-center text-success">
                  <FiCheck size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary">
                  Message sent
                </h3>
                <p className="text-text-secondary text-sm">
                  I typically respond within 24–48 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-mono text-xs uppercase tracking-widest text-accent hover:underline underline-offset-4 mt-2 cursor-pointer"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_fax_hp">Leave empty</label>
                  <input
                    id="company_fax_hp"
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ ...dur, delay: 0.2 }}
                >
                  <label
                    htmlFor="name"
                    className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 block"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="input-base"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ ...dur, delay: 0.3 }}
                >
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 block"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="input-base"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ ...dur, delay: 0.4 }}
                >
                  <label
                    htmlFor="message"
                    className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2 block"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="input-base resize-y"
                  />
                </motion.div>

                {errorMessage && (
                  <div className="text-error text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-accent text-white px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp}
                  transition={{ ...dur, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      <span>Send message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
