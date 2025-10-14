import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import CTAButton from './ui/CTAButton';
import { Mail, Lightbulb, Smile, X, Send, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useFormSounds, useNavigationSounds } from '@/hooks/useSound';

const feedbackTypes = [
  { type: 'problem', icon: Mail },
  { type: 'idea', icon: Lightbulb },
  { type: 'praise', icon: Smile },
];

export default function FeedbackModal({ open, onClose, section = 'default' }) {
  const [step, setStep] = useState(1);
  const [feedbackType, setFeedbackType] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [touched, setTouched] = useState(false); // For visual validation
  const initialFocusRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { playSubmitSuccess, playSubmitError, playFieldFocus } = useFormSounds();
  const { playButtonClick } = useNavigationSounds();

  // Auto-hide success message after 4 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // SIMPLE validation - just needs to have a message
  const isMessageValid = message.trim().length >= 5;

  // Email validation (if provided)
  const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSend = isMessageValid && !sending;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_4z3a60b',    // EmailJS Service ID
        'template_nc73bg4',   // EmailJS Template ID
        {
          from_name: `Feedback Portfolio - ${feedbackType}`,
          from_email: email || 'tbisp0@hotmail.com',
          message: `Type: ${feedbackType}\nSection: ${section}\n\nMessage:\n${message}`,
          to_email: 'tbisp0@hotmail.com',
          subject: `Portfolio Feedback - ${feedbackType} (${section})`,
          reply_to: email || 'tbisp0@hotmail.com'
        },
        'eRzZy4gTZ2NXGjFKz'  // EmailJS User ID
      );
      setSubmitStatus('success');
      setSent(true);

      // Play success sound
      playSubmitSuccess();
    } catch (err) {
      console.error('Error sending feedback:', err);
      setSubmitStatus('error');

      // Play error sound
      playSubmitError();
    } finally {
      setSending(false);
    }
  };

  // Wrapper for button click
  const handleSendClick = () => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSend(fakeEvent);
  };

  // Complete closure (clears everything) - used only on X button or after sending
  const handleCompleteClose = () => {
    setStep(1);
    setFeedbackType(null);
    setMessage('');
    setEmail('');
    setShowEmail(false);
    setSent(false);
    setSubmitStatus('idle');
    setTouched(false);
    onClose();
  };

  // Soft closure (preserves content) - used when clicking outside
  const handleSoftClose = () => {
    // Only closes if there's no content typed or if in the first step
    if (step === 1 || (message.trim() === '' && email.trim() === '')) {
      handleCompleteClose();
    } else {
      // If there's content, just closes but preserves the data
      // Could add a toast here: "Draft saved"
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleSoftClose} initialFocus={initialFocusRef} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm dark:bg-black/50" aria-hidden="true" />
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full mx-auto p-0 z-10 border border-slate-100 dark:border-gray-700">
          <button onClick={handleCompleteClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-700 text-gray-700 dark:text-gray-300" aria-label={t('feedback.close')}>
            <X className="w-5 h-5" />
          </button>
          <div className="p-6 sm:p-8 flex flex-col gap-4">
            {sent ? (
              <div className="flex flex-col items-center py-8">
                <Smile className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <div className="text-center max-w-xs">
                  <p className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">{t('feedback.thankYou')}</p>
                </div>
                <CTAButton
                  onClick={handleCompleteClose}
                  variant="primary"
                  size="md"
                  className="mt-6"
                >
                  {t('feedback.close')}
                </CTAButton>
              </div>
            ) : step === 1 ? (
              <>
                <Dialog.Title className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">{t('feedback.typeQuestion')}</Dialog.Title>
                <div className="flex flex-col gap-3">
                  {feedbackTypes.map(ft => (
                    <CTAButton
                      key={ft.type}
                      variant={feedbackType === ft.type ? 'primary' : 'ghost'}
                      size="md"
                      icon={ft.icon}
                      iconPosition="left"
                      onClick={() => {
                        setFeedbackType(ft.type);
                        setStep(2);
                        playButtonClick();
                      }}
                      className="justify-center py-3"
                    >
                      {t(`feedback.${ft.type}`)}
                    </CTAButton>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSend} className="flex flex-col gap-4 mt-2">
                <Dialog.Title className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  {t(`feedback.${feedbackType}Title`) || t('feedback.defaultTitle')}
                </Dialog.Title>
                <div className="text-xs text-gray-600 dark:text-gray-300 text-center mb-1">
                  {t(`feedback.${feedbackType}Instruction`) || t('feedback.defaultInstruction')}
                </div>
                <div className="relative">
                  <label htmlFor="feedback-message" className="sr-only">
                    {t(`feedback.${feedbackType}Title`) || t('feedback.defaultTitle')}
                  </label>
                  <textarea
                    id="feedback-message"
                    className={`w-full rounded-lg border-2 p-3 min-h-[90px] text-base transition-all focus-visible:ring-2 focus-visible:ring-blue-700 outline-none resize-none bg-slate-50 dark:bg-gray-700 dark:text-white pr-10 ${
                      touched && !isMessageValid
                        ? 'border-red-500 focus:ring-red-500'
                        : touched && isMessageValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-slate-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }`}
                    placeholder={t(`feedback.${feedbackType}Placeholder`) || t('feedback.defaultPlaceholder')}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onBlur={() => setTouched(true)}
                    onFocus={() => playFieldFocus()}
                    required
                    autoFocus
                    maxLength={1000}
                    aria-invalid={touched && !isMessageValid}
                    aria-describedby="feedback-message-help"
                  />
                  {/* Validation icon */}
                  {touched && !isMessageValid && (
                    <X className="absolute right-3 top-3 w-5 h-5 text-red-500 dark:text-red-400" aria-hidden="true" />
                  )}
                  {touched && isMessageValid && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 dark:text-green-400" aria-hidden="true" />
                  )}
                </div>
                {touched && !isMessageValid ? (
                  <div id="feedback-message-help" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mb-1" role="alert">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {t('contact.errors.messageRequired')}
                  </div>
                ) : (
                  <div id="feedback-message-help" className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('feedback.minimumCharacters')}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    id="show-email"
                    type="checkbox"
                    checked={showEmail}
                    onChange={e => setShowEmail(e.target.checked)}
                    className="accent-blue-700"
                  />
                  <label htmlFor="show-email" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                    {t('feedback.includeEmail')}
                  </label>
                </div>
                {showEmail && (
                  <div className="relative">
                    <label htmlFor="feedback-email" className="sr-only">
                      E-mail (opcional)
                    </label>
                    <input
                      id="feedback-email"
                      className={`rounded-lg border-2 p-2 text-base transition-all focus-visible:ring-2 focus-visible:ring-blue-700 outline-none bg-slate-50 dark:bg-gray-700 dark:text-white w-full pr-10
                        ${email.length > 0 ? (isEmailValid ? 'border-green-500' : 'border-red-500') : 'border-slate-300 dark:border-gray-600'}
                      `}
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      aria-invalid={email.length > 0 && !isEmailValid}
                      aria-describedby="feedback-email-help"
                    />
                    {/* Validation icon */}
                    {email.length > 0 && !isEmailValid && (
                      <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500 dark:text-red-400" aria-hidden="true" />
                    )}
                    {email.length > 0 && isEmailValid && (
                      <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500 dark:text-green-400" aria-hidden="true" />
                    )}
                  </div>
                )}
                <a href="/portfolio/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 dark:text-blue-400 underline mb-2">{t('feedback.privacyPolicy')}</a>
                <div className="flex gap-2 mt-2">
                  <CTAButton
                    onClick={handleSendClick}
                    variant="primary"
                    size="md"
                    icon={Send}
                    iconPosition="left"
                    disabled={!canSend}
                    loading={sending}
                    className="flex-1"
                  >
                    {sending ? t('feedback.sending') : t('feedback.send')}
                  </CTAButton>

                  <CTAButton
                    onClick={() => {
                      setStep(1);
                      playButtonClick();
                    }}
                    variant="ghost"
                    size="md"
                    icon={ArrowLeft}
                    iconPosition="left"
                    className="flex-1"
                  >
                    {t('feedback.back')}
                  </CTAButton>
                </div>

                {/* Status Messages - Below Buttons */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium text-left">
                      {t('feedback.thankYou')}
                    </span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium text-left">
                      {i18n.language === 'en-US' ? 'Error sending feedback. Please try again.' :
                       i18n.language === 'es-ES' ? 'Error al enviar feedback. Inténtalo de nuevo.' :
                       'Erro ao enviar feedback. Tente novamente.'}
                    </span>
                  </motion.div>
                )}

              </form>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}