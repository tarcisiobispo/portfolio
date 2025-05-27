import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import CTAButton from './ui/CTAButton';
import { Mail, Lightbulb, Smile, X, Send, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const feedbackTypes = [
  { type: 'problem', icon: Mail },
  { type: 'idea', icon: Lightbulb },
  { type: 'praise', icon: Smile },
];

// Removido - agora usamos traduções

// Removido - agora usamos traduções

export default function FeedbackModal({ open, onClose, section = 'default' }) {
  const [step, setStep] = useState(1);
  const [feedbackType, setFeedbackType] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [touched, setTouched] = useState(false); // Para mostrar validação visual
  const initialFocusRef = useRef(null);
  const { t } = useTranslation();

  // Auto-hide da mensagem de sucesso após 4 segundos
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validação SIMPLES - só precisa ter mensagem
  const isMessageValid = message.trim().length >= 5;

  // Validação de email (se fornecido)
  const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSend = isMessageValid && !sending;

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_4z3a60b',    // Service ID do EmailJS
        'template_nc73bg4',   // Template ID do EmailJS
        {
          from_name: `Feedback Portfolio - ${feedbackType}`,
          from_email: email || 'tbisp0@hotmail.com',
          message: `Tipo: ${feedbackType}\nSeção: ${section}\n\nMensagem:\n${message}`,
          to_email: 'tbisp0@hotmail.com',
          subject: `Feedback do Portfolio - ${feedbackType} (${section})`,
          reply_to: email || 'tbisp0@hotmail.com'
        },
        'eRzZy4gTZ2NXGjFKz'  // User ID do EmailJS
      );
      setSubmitStatus('success');
      setSent(true);
    } catch (err) {
      console.error('Erro ao enviar feedback:', err);
      setSubmitStatus('error');
      // REMOVIDO: toast - agora só mostra mensagem embaixo do botão
    } finally {
      setSending(false);
    }
  };

  // Fechamento completo (limpa tudo) - usado apenas no botão X ou após envio
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

  // Fechamento suave (preserva conteúdo) - usado ao clicar fora
  const handleSoftClose = () => {
    // Só fecha se não tiver conteúdo digitado ou se estiver na primeira etapa
    if (step === 1 || (message.trim() === '' && email.trim() === '')) {
      handleCompleteClose();
    } else {
      // Se tiver conteúdo, apenas fecha mas preserva os dados
      // Poderia adicionar um toast aqui: "Rascunho salvo"
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleSoftClose} initialFocus={initialFocusRef} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto p-0 z-10 border border-slate-100">
          <button onClick={handleCompleteClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-700" aria-label={t('feedback.close')}>
            <X className="w-5 h-5" />
          </button>
          <div className="p-6 sm:p-8 flex flex-col gap-4">
            {sent ? (
              <div className="flex flex-col items-center py-8">
                <Smile className="w-12 h-12 text-green-600 mb-4" />
                <div className="text-center max-w-xs">
                  <p className="text-lg font-semibold text-green-700 mb-2">{t('feedback.form.success')}</p>
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
                <Dialog.Title className="text-lg sm:text-xl font-bold mb-4 text-blue-900 text-center">{t('feedback.typeQuestion')}</Dialog.Title>
                <div className="flex flex-col gap-3">
                  {feedbackTypes.map(ft => (
                    <CTAButton
                      key={ft.type}
                      variant={feedbackType === ft.type ? 'primary' : 'ghost'}
                      size="md"
                      icon={ft.icon}
                      iconPosition="left"
                      onClick={() => { setFeedbackType(ft.type); setStep(2); }}
                      className="justify-center py-3"
                    >
                      {t(`feedback.${ft.type}`)}
                    </CTAButton>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSend} className="flex flex-col gap-4 mt-2">
                <Dialog.Title className="text-lg sm:text-xl font-bold text-blue-900 text-center mb-2">
                  {t(`feedback.${feedbackType}Title`) || t('feedback.defaultTitle')}
                </Dialog.Title>
                <div className="text-xs text-slate-600 text-center mb-1">
                  {t(`feedback.${feedbackType}Instruction`) || t('feedback.defaultInstruction')}
                </div>
                <div className="relative">
                  <textarea
                    className={`w-full rounded-lg border-2 p-3 min-h-[90px] text-base transition-all focus-visible:ring-2 focus-visible:ring-blue-700 outline-none resize-none bg-slate-50 pr-10 ${
                      touched && !isMessageValid
                        ? 'border-red-500 focus:ring-red-500'
                        : touched && isMessageValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-slate-300 hover:border-blue-400'
                    }`}
                    placeholder={t(`feedback.${feedbackType}Placeholder`) || t('feedback.defaultPlaceholder')}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onBlur={() => setTouched(true)}
                    required
                    autoFocus
                    maxLength={1000}
                    aria-invalid={touched && !isMessageValid}
                    aria-describedby="feedback-message-help"
                  />
                  {/* Ícone de validação */}
                  {touched && !isMessageValid && (
                    <X className="absolute right-3 top-3 w-5 h-5 text-red-500" aria-hidden="true" />
                  )}
                  {touched && isMessageValid && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
                {touched && !isMessageValid ? (
                  <div id="feedback-message-help" className="text-xs text-red-500 flex items-center gap-1 mb-1" role="alert">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {t('feedback.form.messageRequired')}
                  </div>
                ) : (
                  <div id="feedback-message-help" className="text-xs text-slate-500 mb-1">
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
                  <label htmlFor="show-email" className="text-sm text-slate-700 cursor-pointer select-none">
                    {t('feedback.includeEmail')}
                  </label>
                </div>
                {showEmail && (
                  <div className="relative">
                    <input
                      className={`rounded-lg border-2 p-2 text-base transition-all focus-visible:ring-2 focus-visible:ring-blue-700 outline-none bg-slate-50 w-full pr-10
                        ${email.length > 0 ? (isEmailValid ? 'border-green-500' : 'border-red-500') : 'border-slate-300'}
                      `}
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      aria-invalid={email.length > 0 && !isEmailValid}
                      aria-describedby="feedback-email-help"
                    />
                    {/* Ícone de validação */}
                    {email.length > 0 && !isEmailValid && (
                      <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" aria-hidden="true" />
                    )}
                    {email.length > 0 && isEmailValid && (
                      <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" aria-hidden="true" />
                    )}
                  </div>
                )}
                <a href="/portfolio/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 underline mb-2">{t('feedback.privacyPolicy')}</a>
                <div className="flex gap-2 mt-2">
                  <CTAButton
                    onClick={handleSend}
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
                    onClick={() => setStep(1)}
                    variant="ghost"
                    size="md"
                    icon={ArrowLeft}
                    iconPosition="left"
                    className="flex-1"
                  >
                    {t('feedback.back')}
                  </CTAButton>
                </div>

                {/* Mensagens de Status - Embaixo dos Botões */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium text-left">{t('feedback.form.success')}</span>
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
                    <span className="text-sm font-medium text-left">{t('feedback.form.error')}</span>
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