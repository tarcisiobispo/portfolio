import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex items-center justify-center min-h-[200px]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="space-y-2 text-sm text-[var(--color-muted)]">
          <p>© 2024 Tarcísio Bispo. Todos os direitos reservados.</p>
          <p className="font-medium">UX/Product Designer</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
