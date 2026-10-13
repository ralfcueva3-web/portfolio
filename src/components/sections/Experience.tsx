// BUILT-BY: gemini-flash
'use client';

import { experience } from '@/../../data/content';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

/**
 * Experience timeline section displaying professional career milestones,
 * roles, key contributions, and tech stacks.
 */
export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden" aria-label="Work Experience">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-accent-start uppercase mb-3">
            <span className="w-6 h-[1px] bg-accent-start inline-block" />
            <span>03 // TRAJECTORY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            Work Experience
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-glass-border/80 ml-3 md:ml-6 space-y-10 md:space-y-12">
          {experience.map((item, index) => (
            <div key={`${item.company}-${item.year}`} className="relative pl-6 md:pl-10 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-start group-hover:border-accent-end group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-end opacity-75 group-hover:opacity-100" />
              </div>

              {/* Experience Card */}
              <GlassCard
                glow={false}
                hover={true}
                className="p-6 md:p-8 bg-bg-card/70 border-glass-border hover:border-accent-start/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <FiBriefcase className="text-accent-start shrink-0" size={16} />
                    <h3 className="text-lg md:text-xl font-display font-bold text-text-primary">
                      {item.role}
                    </h3>
                    <span className="text-text-muted font-normal">@</span>
                    <span className="text-sm md:text-base font-semibold text-accent-end">
                      {item.company}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary bg-white/5 px-3 py-1 rounded-full border border-glass-border shrink-0 self-start sm:self-auto">
                    <FiCalendar size={13} className="text-text-muted" />
                    <span>{item.year}</span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-text-secondary leading-relaxed font-body mb-5">
                  {item.description}
                </p>

                {/* Technologies Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-glass-border/60">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="default" className="text-xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
