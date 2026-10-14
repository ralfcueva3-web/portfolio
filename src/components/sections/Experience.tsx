// BUILT-BY: opus-4.6
'use client';

import { experience } from '@/../../data/content';
import Badge from '@/components/ui/Badge';

/**
 * Experience section — horizontal table/grid layout.
 * Each entry is a row: year | role + company | description | tech.
 * Separated by hairline rules. More CV than fancy timeline.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      className="section-padding relative"
      aria-label="Work Experience"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-4 mb-12 md:mb-16">
          <span className="section-index">04 / Experience</span>
          <div className="rule flex-1" />
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-text-primary mb-16">
          Where I&apos;ve worked
        </h2>

        {/* Experience entries */}
        <div className="border-t border-border-primary">
          {experience.map((item) => (
            <div
              key={`${item.company}-${item.year}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-border-primary group hover:bg-surface-hover transition-colors -mx-4 px-4"
            >
              {/* Year */}
              <div className="md:col-span-2">
                <span className="font-mono text-xs text-text-muted tracking-wider">
                  {item.year}
                </span>
              </div>

              {/* Role + Company */}
              <div className="md:col-span-3">
                <h3 className="text-base md:text-lg font-display font-bold text-text-primary leading-tight">
                  {item.role}
                </h3>
                <span className="text-sm text-accent font-medium">
                  {item.company}
                </span>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="md:col-span-3 flex flex-wrap gap-1.5 content-start">
                {item.technologies.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
