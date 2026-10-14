// BUILT-BY: opus-4.6
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/../../data/content';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
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

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Skills section — category tabs + skill rows with animated transitions.
 */
export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const prefersReduced = useReducedMotion();
  const vp = { once: true, margin: '-80px' as const };
  const dur = { duration: 0.6, ease };

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
        {/* Section header — slide from left */}
        <motion.div
          className="flex items-baseline gap-4 mb-12 md:mb-16"
          initial={prefersReduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={dur}
        >
          <span className="section-index">02 / Capabilities</span>
          <div className="rule flex-1" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — heading + tabs */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden">
              <motion.h2
                className="text-3xl md:text-5xl font-display font-bold tracking-tighter text-text-primary mb-8"
                initial={prefersReduced ? false : { y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={vp}
                transition={{ duration: 0.7, ease }}
              >
                {skills.title}
              </motion.h2>
            </div>

            {/* Category tabs — stagger fade in */}
            <motion.div
              className="flex flex-wrap lg:flex-col gap-1"
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={dur}
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
                      <motion.span
                        layoutId="skills-tab-indicator"
                        className="absolute bottom-0 left-3 right-3 h-px bg-accent lg:left-0 lg:right-auto lg:top-0 lg:bottom-0 lg:w-px lg:h-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Right — skills list with AnimatePresence */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
              >
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
                      {category.items.map((skill, idx) => {
                        const Icon = iconMap[skill.icon] || FiCode;
                        return (
                          <motion.div
                            key={skill.name}
                            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...dur, delay: idx * 0.04 }}
                            className="flex items-center gap-4 py-3 border-b border-border-secondary group hover:bg-surface-hover transition-colors px-2 -mx-2"
                          >
                            <div className="w-8 h-8 flex items-center justify-center text-text-muted group-hover:text-accent transition-colors shrink-0">
                              <Icon size={16} />
                            </div>
                            <span className="text-sm text-text-primary font-medium flex-shrink-0 min-w-[140px]">
                              {skill.name}
                            </span>
                            <div className="flex-1 h-px bg-border-primary relative">
                              <motion.div
                                className="absolute inset-y-0 left-0 bg-accent group-hover:h-[3px] group-hover:-top-[1px]"
                                style={{ height: '1px' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.04 + 0.2, ease }}
                                role="progressbar"
                                aria-valuenow={skill.level}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label={`${skill.name} proficiency`}
                              />
                            </div>
                            <span className="font-mono text-xs text-text-muted tabular-nums shrink-0 w-8 text-right">
                              {skill.level}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
