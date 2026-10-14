// BUILT-BY: opus-4.6
'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  type?: 'words' | 'chars';
  stagger?: number;
  delay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay: number; stagger: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

// Editorial Brutalist: sharp, clean translation without blur filters
const itemVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Editorial Brutalist SplitText animation component.
 * Reveals individual words or characters with crisp upward motion.
 * Headings automatically get the font-display class.
 */
export default function SplitText({
  text,
  className = '',
  as: Tag = 'p',
  type = 'words',
  stagger = 0.04,
  delay = 0,
}: SplitTextProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const prefersReduced = useReducedMotion();
  const items = type === 'words' ? text.split(' ') : text.split('');
  const isHeading = typeof Tag === 'string' && Tag.startsWith('h');
  const MotionTag = (Tag in motionTags ? motionTags[Tag as keyof typeof motionTags] : motion.p) as typeof motion.p;

  return (
    <div ref={ref}>
      <MotionTag
        className={cn(
          'flex flex-wrap gap-x-[0.3em] overflow-hidden leading-tight',
          isHeading && 'font-display font-bold tracking-tight text-text-primary',
          className,
        )}
        variants={containerVariants}
        custom={{ delay, stagger }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              variants={prefersReduced ? reducedVariants : itemVariants}
              className="inline-block"
            >
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    </div>
  );
}
