// BUILT-BY: opus-4.6
'use client';

import { projects } from '@/../../data/content';
import Badge from '@/components/ui/Badge';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

/**
 * Projects section — stacked full-width project entries.
 * Each project gets significant vertical space with asymmetric layout:
 * number on left, title large, tech stack as mono badges, links as text.
 * Featured projects are visually distinct.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding relative"
      aria-label="Selected Work"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-4 mb-12 md:mb-16">
          <span className="section-index">03 / Selected Work</span>
          <div className="rule flex-1" />
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary mb-16">
          Things I&apos;ve built
        </h2>

        {/* Project entries */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group border-t border-border-primary py-10 md:py-14 first:border-t-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Left column — index + year */}
                <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-4 md:gap-2">
                  <span className="font-mono text-4xl md:text-5xl font-bold text-border-primary group-hover:text-accent transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
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
                <div className="md:col-span-4 flex flex-wrap gap-2 content-start">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
