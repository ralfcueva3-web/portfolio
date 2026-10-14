// BUILT-BY: opus-4.6
'use client';

import { useState } from 'react';
import { skills } from '@/../../data/content';
import { cn } from '@/lib/utils';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPytorch,
  SiHuggingface,
  SiTensorflow,
  SiDocker,
  SiGithubactions,
  SiVercel,
} from 'react-icons/si';
import { TbBrandOpenai } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa6';
import { FiCode } from 'react-icons/fi';
import type { IconType } from 'react-icons';

/** Icon map — connects data icon keys to actual React Icons */
const iconMap: Record<string, IconType> = {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPytorch,
  SiOpenai: TbBrandOpenai,
  SiHuggingface,
  SiTensorflow,
  SiDocker,
  SiAmazonwebservices: FaAws,
  SiGithubactions,
  SiVercel,
};

/**
 * Skills section — full-width compact table layout.
 * Category tabs as minimal text buttons (active = orange underline).
 * Skills as horizontal rows with name + thin proficiency bar.
 * NO card grids, NO glassmorphism.
 */
export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', ...skills.categories.map((c) => c.name)];
  const displayedCategories =
    activeTab === 'All'
      ? skills.categories
      : skills.categories.filter((c) => c.name === activeTab);

  return (
    <section
      id="skills"
      className="section-padding relative"
      aria-label="Skills and Technologies"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-baseline gap-4 mb-12 md:mb-16">
          <span className="section-index">02 / Capabilities</span>
          <div className="rule flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — heading + tabs */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter text-text-primary mb-8">
              {skills.title}
            </h2>

            {/* Category tabs — minimal text buttons */}
            <div className="flex flex-wrap lg:flex-col gap-1">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                      'text-left font-mono text-xs uppercase tracking-widest px-3 py-2 transition-colors duration-150 cursor-pointer relative',
                      isActive
                        ? 'text-accent font-medium'
                        : 'text-text-muted hover:text-text-primary'
                    )}
                    aria-pressed={isActive}
                  >
                    {cat}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-px bg-accent lg:left-0 lg:right-auto lg:top-0 lg:bottom-0 lg:w-px lg:h-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — skills list */}
          <div className="lg:col-span-8">
            {displayedCategories.map((category) => (
              <div key={category.name} className="mb-10 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    {category.name}
                  </h3>
                  <span className="font-mono text-[10px] text-text-muted">
                    ({category.items.length})
                  </span>
                </div>

                <div className="border-t border-border-primary">
                  {category.items.map((skill) => {
                    const Icon = iconMap[skill.icon] || FiCode;
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-4 py-3 border-b border-border-secondary group hover:bg-surface-hover transition-colors px-2 -mx-2"
                      >
                        {/* Icon */}
                        <div className="w-8 h-8 flex items-center justify-center text-text-muted group-hover:text-accent transition-colors shrink-0">
                          <Icon size={16} />
                        </div>

                        {/* Name */}
                        <span className="text-sm text-text-primary font-medium flex-shrink-0 min-w-[140px]">
                          {skill.name}
                        </span>

                        {/* Proficiency bar */}
                        <div className="flex-1 h-px bg-border-primary relative">
                          <div
                            className="absolute inset-y-0 left-0 bg-accent transition-all duration-500 group-hover:h-[3px] group-hover:-top-[1px]"
                            style={{ width: `${skill.level}%`, height: '1px' }}
                            role="progressbar"
                            aria-valuenow={skill.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${skill.name} proficiency`}
                          />
                        </div>

                        {/* Level */}
                        <span className="font-mono text-xs text-text-muted tabular-nums shrink-0 w-8 text-right">
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
