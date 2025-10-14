import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Container from './Layout/Container';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] py-16 flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full flex items-center justify-center"
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p>{t('footer.copyright')}</p>
            <p className="font-medium">{t('footer.title')}</p>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
