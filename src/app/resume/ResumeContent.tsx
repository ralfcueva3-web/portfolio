// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiDownload, FiArrowLeft, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { resumeData, experience, skills, about } from '@/../../data/content';
import Badge from '@/components/ui/Badge';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const vp = { once: true, margin: '-60px' as const };

/**
 * Resume page content — matches the site's editorial style.
 * Looks like a print resume but with the site's design tokens.
 */
export default function ResumeContent() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link + Download */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors link-underline"
          >
            <FiArrowLeft size={14} />
            <span>Back to site</span>
          </Link>
          <a
            href={resumeData.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-accent-hover transition-colors"
          >
            <FiDownload size={14} />
            <span>Download PDF</span>
          </a>
        </motion.div>

        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-text-primary leading-[0.9]">
            {resumeData.name}
            <span className="text-accent italic font-light ml-4 text-3xl md:text-4xl">
              {resumeData.alias}
            </span>
          </h1>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mt-4">
            {resumeData.title}
          </p>

          {/* Contact row */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-text-secondary">
            <a href={`mailto:${resumeData.email}`} className="inline-flex items-center gap-1.5 font-mono text-xs hover:text-accent transition-colors">
              <FiMail size={12} /> {resumeData.email}
            </a>
            <span className="font-mono text-xs">{resumeData.location}</span>
            <a href={`https://${resumeData.website}`} className="font-mono text-xs hover:text-accent transition-colors">
              {resumeData.website}
            </a>
            <a href="https://github.com/ralfcueva3-web" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <FiGithub size={14} />
            </a>
            <a href="www.linkedin.com/in/ayush-chakraborty-246358284" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <FiLinkedin size={14} />
            </a>
          </div>
        </motion.header>

        <div className="rule mb-8" />

        {/* Summary */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">Summary</h2>
          <p className="text-text-secondary text-base leading-relaxed">
            {resumeData.summary}
          </p>
        </motion.section>

        <div className="rule mb-8" />

        {/* Experience */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((item, idx) => (
              <motion.div
                key={`${item.company}-${item.year}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: idx * 0.08, ease }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg font-display font-bold text-text-primary">{item.role}</h3>
                    <span className="text-sm text-accent font-medium">{item.company}</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted tracking-wider">{item.year}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="default">{tech}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="rule mb-8" />

        {/* Skills */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.categories.map((category) => (
              <div key={category.name}>
                <h3 className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-3">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <Badge key={skill.name} variant="default">{skill.name}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="rule mb-8" />

        {/* Education / Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease }}
        >
          <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-6">At a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {about.stats.map((stat) => (
              <div key={stat.label} className="border border-border-primary p-4">
                <div className="text-2xl font-display font-bold text-text-primary tabular-nums">
                  {stat.value}+
                </div>
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[11px] text-text-muted tracking-wider">
            References available upon request · This page is also available as a{' '}
            <a
              href={resumeData.pdfUrl}
              className="text-accent hover:underline underline-offset-4"
            >
              PDF download
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
