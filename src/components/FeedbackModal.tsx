import React, { useState, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import CTAButton from './ui/CTAButton';
import { Mail, Lightbulb, Smile, X, Send, ArrowLeft } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

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
  const initialFocusRef = useRef(null);
  const { t } = useTranslation();

  // Validação SIMPLES - só precisa ter mensagem
  const isMessageValid = message.trim().length >= 5;
  const canSend = isMessageValid && !sending;

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        'service_4z3a60b',
        'template_nc73bg4',
        {
          feedback_type: feedbackType,
          message,
          email: email || 'Não informado',
          section,
          to_email: 'tbisp0@hotmail.com',
          subject: `Feedback do Portfolio - ${feedbackType} (${section})`,
          from_name: 'Feedback Portfolio'
        },
        'eRzZy4gTZ2NXGjFKz'
      );
      setSent(true);
    } catch (err) {
      alert('Erro ao enviar feedback. Tente novamente.');
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
                <Smile className="w-10 h-10 text-green-600 mb-2" />
                <h2 className="text-xl font-bold mb-2 text-center">{t('feedback.thankYou')}</h2>
                <p className="text-slate-600 text-center">{t('feedback.importance')}</p>
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
                <textarea
                  className="w-full rounded-lg border border-slate-300 p-3 min-h-[90px] text-base transition-all focus-visible:ring-2 focus-visible:ring-blue-700 outline-none resize-none bg-slate-50"
                  placeholder={t(`feedback.${feedbackType}Placeholder`) || t('feedback.defaultPlaceholder')}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  autoFocus
                  maxLength={1000}
                  aria-invalid={!isMessageValid}
                  aria-describedby="feedback-message-help"
                />
                <div id="feedback-message-help" className="text-xs text-slate-500 mb-1">
                  {t('feedback.minimumCharacters')}
                </div>
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
                  <input
                    className={`rounded-lg border p-2 text-base transition-all focus-visible:ring-2 focus-visible:ring-blue-700 outline-none bg-slate-50 w-full
                      ${email.length > 0 ? (isEmailValid ? 'border-green-400' : 'border-red-400') : 'border-slate-300'}
                    `}
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-invalid={email.length > 0 && !isEmailValid}
                    aria-describedby="feedback-email-help"
                  />
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
              </form>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}