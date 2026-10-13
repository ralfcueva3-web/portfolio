// BUILT-BY: gemini-flash
'use client';

import { useState } from 'react';
import { skills } from '@/../../data/content';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
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
import { FiCode, FiLayers } from 'react-icons/fi';
import type { IconType } from 'react-icons';

/** Icon map connecting data icon keys to actual React Icons */
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
 * Skills section with a categorized responsive grid layout (non-3D).
 * Features active category filtering, skill levels, and interactive cards.
 */
export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', ...skills.categories.map((c) => c.name)];

  const displayedCategories =
    activeTab === 'All'
      ? skills.categories
      : skills.categories.filter((c) => c.name === activeTab);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Skills and Technologies">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-accent-start uppercase mb-3">
              <span className="w-6 h-[1px] bg-accent-start inline-block" />
              <span>02 // CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
              {skills.title}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-bg-card/80 p-1.5 rounded-full border border-glass-border">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-start cursor-pointer',
                    isActive
                      ? 'bg-gradient-to-r from-accent-start to-accent-end text-white shadow-md shadow-accent-start/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  )}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories and Skill Cards Grid */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <div key={category.name} className="space-y-5">
              <div className="flex items-center gap-3">
                <FiLayers className="text-accent-start" size={18} />
                <h3 className="text-lg md:text-xl font-display font-semibold text-text-primary">
                  {category.name}
                </h3>
                <Badge variant="default" className="text-[11px] py-0.5">
                  {category.items.length} tools
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((skill) => {
                  const Icon = iconMap[skill.icon] || FiCode;

                  return (
                    <GlassCard
                      key={skill.name}
                      glow={false}
                      hover={true}
                      className="p-5 flex flex-col justify-between group border-glass-border hover:border-accent-start/40 bg-bg-card/60 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-glass-border flex items-center justify-center text-text-primary group-hover:text-accent-end group-hover:scale-110 group-hover:border-accent-end/30 transition-all duration-300">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-text-primary group-hover:text-white transition-colors">
                              {skill.name}
                            </h4>
                            <span className="text-[11px] text-text-muted font-mono">
                              {category.name}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-text-secondary group-hover:text-accent-end transition-colors">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Proficiency Bar */}
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-start to-accent-end rounded-full transition-all duration-700 ease-out group-hover:brightness-125"
                          style={{ width: `${skill.level}%` }}
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} proficiency`}
                        />
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
