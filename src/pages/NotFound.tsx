import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/ui/CTAButton';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Track 404 errors for analytics
    console.log('404 Error tracked:', location.pathname);
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">

      <motion.div
        className="text-center px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            className="text-9xl font-bold text-[var(--color-primary)] mb-4"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            404
          </motion.div>
          <div className="w-32 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text)]">
            {t('notFound.title')}
          </h1>
          <p className="text-[var(--color-muted)] mb-8 max-w-md mx-auto text-lg">
            {t('notFound.message')}
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-sm text-[var(--color-muted)]">
            {t('notFound.pathAttempted')} <code className="bg-[var(--color-surface)] px-2 py-1 rounded text-xs">{location.pathname}</code>
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <CTAButton
              variant="primary"
              icon={Home}
              iconPosition="left"
              className="min-w-[160px]"
            >
              {t('notFound.backToHome')}
            </CTAButton>
          </Link>

          <CTAButton
            onClick={() => window.history.back()}
            variant="ghost"
            icon={ArrowLeft}
            iconPosition="left"
            className="min-w-[160px]"
          >
            {t('notFound.goBack')}
          </CTAButton>

          <CTAButton
            onClick={() => window.location.reload()}
            variant="ghost"
            icon={RefreshCw}
            iconPosition="left"
            className="min-w-[160px]"
          >
            {t('notFound.reload')}
          </CTAButton>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-[var(--color-border)]"
        >
          <p className="text-sm text-[var(--color-muted)] mb-4">
            {t('notFound.lookingFor')}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/#projetos"
              className="text-sm text-[var(--color-primary)] hover:underline px-3 py-1 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-colors"
            >
              {t('notFound.projects')}
            </Link>
            <Link
              to="/#backlog"
              className="text-sm text-[var(--color-primary)] hover:underline px-3 py-1 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-colors"
            >
              {t('notFound.backlog')}
            </Link>
            <Link
              to="/#contato"
              className="text-sm text-[var(--color-primary)] hover:underline px-3 py-1 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-colors"
            >
              {t('notFound.contact')}
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm text-[var(--color-primary)] hover:underline px-3 py-1 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-colors"
            >
              {t('notFound.privacyPolicy')}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
