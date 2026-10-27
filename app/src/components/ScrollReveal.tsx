'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ScrollReveal({ children, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
