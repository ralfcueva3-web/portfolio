'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
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

const itemVariants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(4px)' },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/**
 * Splits text into individual word or character spans and reveals them
 * with a staggered blur and slide-up animation when scrolled into view.
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
  const items = type === 'words' ? text.split(' ') : text.split('');

  const MotionTag = motion.create(Tag);

  return (
    <div ref={ref}>
      <MotionTag
        className={`flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}
        variants={containerVariants}
        custom={{ delay, stagger }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span variants={itemVariants} className="inline-block">
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    </div>
  );
}
