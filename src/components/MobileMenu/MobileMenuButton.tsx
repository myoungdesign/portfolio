'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils';

type MobileMenuButtonProps = {
  open: boolean;
  onClick: () => void;
  className?: string;
};

const LINES = [
  { closed: { x1: 10, y1: 14, x2: 38, y2: 14 }, open: { x1: 24.9, y1: 23.9, x2: 15, y2: 14 } },
  { closed: { x1: 10, y1: 23, x2: 38, y2: 23 }, open: { x1: 15.1, y1: 33.9, x2: 34.9, y2: 14.1 } },
  { closed: { x1: 10, y1: 33, x2: 38, y2: 33 }, open: { x1: 34.9, y1: 33.9, x2: 25, y2: 24 } },
] as const;

const TRANSITION = { duration: 0.28, ease: 'easeInOut' } as const;

export function MobileMenuButton({ open, onClick, className }: MobileMenuButtonProps) {
  const state = open ? 'open' : 'closed';
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onClick}
      className={cn('flex size-10 items-center justify-center text-white', className)}
    >
      <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        {LINES.map((line, i) => (
          <motion.line
            key={i}
            initial={false}
            animate={line[state]}
            transition={TRANSITION}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </button>
  );
}
