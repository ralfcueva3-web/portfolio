// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';
import { projects } from '@/../../data/content';
import Badge from '@/components/ui/Badge';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Projects section — stacked full-width project entries with reveal animations.
 * Each project slides up as you scroll to it.
 */
export default function Projects() {
  const prefersReduced = useReducedMotion();
  const vp = { once: true, margin: '-80px' as const };
  const dur = { duration: 0.6, ease };

  return (
    <section
      id="projects"
      className="section-padding relative"
      aria-label="Selected Work"
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
          <span className="section-index">03 / Selected Work</span>
          <div className="rule flex-1" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary mb-16"
            initial={prefersReduced ? false : { y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
          >
            Things I&apos;ve built
          </motion.h2>
        </div>

        {/* Project entries — each slides up */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group border-t border-border-primary py-10 md:py-14 first:border-t-0"
              initial={prefersReduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ ...dur, delay: index * 0.08 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Left column — index + year */}
                <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-4 md:gap-2">
                  <motion.span
                    className="font-mono text-4xl md:text-5xl font-bold text-border-primary group-hover:text-accent transition-colors duration-300"
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={vp}
                    transition={{ duration: 0.5, delay: index * 0.08 + 0.1, ease }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    {project.year}
                  </span>
                  {project.featured && (
                    <Badge variant="accent" className="mt-1">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Middle column — title + description */}
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {project.longDescription}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-6 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-primary hover:text-accent transition-colors link-underline"
                      >
                        <span>Live</span>
                        <FiArrowUpRight size={12} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors link-underline"
                      >
                        <FiGithub size={12} />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right column — tech stack */}
                <motion.div
                  className="md:col-span-4 flex flex-wrap gap-2 content-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: index * 0.08 + 0.2 } } }}
                >
                  {project.stack.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge variant="default">
                        {tech}
                      </Badge>
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
