// BUILT-BY: gemini-flash
'use client';

import { useState } from 'react';
import { contact } from '@/../../data/content';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck, FiArrowUpRight } from 'react-icons/fi';

/**
 * Contact section with an accessible form, direct communication links,
 * and availability status indicator.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration',
    message: '',
    honeypot: '', // spam honeypot
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Simulate form submission delay or endpoint call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'Collaboration',
        message: '',
        honeypot: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please reach out directly via email.');
    }
  };

  const socials = [
    { name: 'GitHub', href: contact.socials.github, icon: FiGithub },
    { name: 'LinkedIn', href: contact.socials.linkedin, icon: FiLinkedin },
    { name: 'Twitter', href: contact.socials.twitter, icon: FiTwitter },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" aria-label="Contact Section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-accent-start uppercase mb-3">
            <span className="w-6 h-[1px] bg-accent-start inline-block" />
            <span>04 // CONTACT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            {contact.title}
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mt-4 font-body">
            {contact.description}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-glass-border bg-bg-card/70 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-text-primary">
                Available for New Projects & Roles
              </span>
            </div>

            {/* Email Card */}
            <GlassCard
              glow={false}
              hover={true}
              className="p-6 md:p-8 bg-bg-card/70 border-glass-border hover:border-accent-start/40 flex flex-col justify-between"
            >
              <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                Direct Inquiries
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-lg md:text-xl font-display font-bold text-text-primary hover:text-accent-start transition-colors flex items-center gap-2 group"
              >
                <FiMail className="text-accent-start shrink-0" size={20} />
                <span>{contact.email}</span>
                <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </GlassCard>

            {/* Social Links */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
                Profiles & Networks
              </div>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-glass-border bg-bg-card/60 hover:bg-white/5 hover:border-accent-start/30 text-text-secondary hover:text-text-primary text-sm font-medium transition-all group"
                    >
                      <Icon size={16} className="text-text-muted group-hover:text-accent-end transition-colors" />
                      <span>{social.name}</span>
                      <FiArrowUpRight size={13} className="text-text-muted group-hover:text-text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard
              glow={false}
              hover={false}
              className="p-6 md:p-10 bg-bg-card/80 border-glass-border"
            >
              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <FiCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary">
                    Message Dispatched
                  </h3>
                  <p className="text-text-secondary max-w-md text-sm font-body">
                    Thank you for reaching out! I typically respond within 24–48 business hours.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setStatus('idle')}
                    className="mt-4"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from screen/users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_fax_hp">Leave this empty</label>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono text-text-secondary uppercase">
                        Your Name <span className="text-accent-start">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Rivera"
                        className="w-full bg-white/5 border border-glass-border focus:border-accent-start rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-start transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-text-secondary uppercase">
                        Email Address <span className="text-accent-start">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full bg-white/5 border border-glass-border focus:border-accent-start rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-start transition-all"
                      />
                    </div>
                  </div>

                  {/* Inquiry Topic */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-mono text-text-secondary uppercase">
                      Inquiry Focus
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-bg-secondary border border-glass-border focus:border-accent-start rounded-xl px-4 py-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-start transition-all cursor-pointer"
                    >
                      <option value="Collaboration">Full-time Opportunity / Recruiting</option>
                      <option value="Freelance">Consulting / Architecture Review</option>
                      <option value="Advisory">Speaking / Open Source Discussion</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono text-text-secondary uppercase">
                      Message <span className="text-accent-start">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details about the project, timeline, or requirements..."
                      className="w-full bg-white/5 border border-glass-border focus:border-accent-start rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-start transition-all resize-y"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FiSend size={16} />
                        <span>Send Message</span>
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
