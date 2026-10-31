'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Jeda masuk dalam milidetik, untuk efek bertahap antar butir. */
  delay?: number;
};

export default function ScrollReveal({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
