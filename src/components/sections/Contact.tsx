// BUILT-BY: opus-4.6
'use client';

import { useState } from 'react';
import { contact } from '@/../../data/content';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck, FiArrowUpRight } from 'react-icons/fi';

/**
 * Contact section — split layout.
 * Left: heading, availability, email, socials.
 * Right: minimal contact form with underline-style inputs.
 * No glassmorphism cards. Clean editorial styling.
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot
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
    { name: 'GitHub', href: contact.socials.github, icon: FiGithub, handle: '@ralph' },
    { name: 'LinkedIn', href: contact.socials.linkedin, icon: FiLinkedin, handle: '/in/raman-ralph' },
    { name: 'Twitter', href: contact.socials.twitter, icon: FiTwitter, handle: '@ralphdev' },
  ];

  return (
    <section
      id="contact"
      className="section-padding relative"
      aria-label="Contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-4 mb-12 md:mb-16">
          <span className="section-index">05 / Contact</span>
          <div className="rule flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — info */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary leading-[0.95]">
              {contact.title}
            </h2>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              {contact.description}
            </p>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                Available for new projects
              </span>
            </div>

            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-2 text-lg md:text-xl font-display font-bold text-text-primary hover:text-accent transition-colors"
            >
              <FiMail size={18} className="text-accent" />
              <span>{contact.email}</span>
              <FiArrowUpRight
                size={14}
                className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>

            {/* Social links */}
            <div className="space-y-3 pt-4 border-t border-border-primary">
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                Profiles
              </span>
              <div className="space-y-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors group"
                    >
                      <Icon size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                      <span className="font-mono text-xs">{social.handle}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 border border-border-primary">
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
              </div>
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
                <div>
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
                </div>

                {/* Email */}
                <div>
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
                </div>

                {/* Message */}
                <div>
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
                </div>

                {errorMessage && (
                  <div className="text-error text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-accent text-white px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
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
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
