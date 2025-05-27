import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import CTAButton from '@/components/ui/CTAButton';

// Tipos para o formulário
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormTouched {
  name: boolean;
  email: boolean;
  message: boolean;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();

  // Estados do formulário
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs para acessibilidade
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Auto-hide da mensagem de sucesso após 4 segundos
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validação de email segura - usando API nativa do browser
  const isValidEmail = (email: string): boolean => {
    try {
      // Validação básica de formato
      if (!email || !email.includes('@') || email.length < 5) {
        return false;
      }

      // Usar validação nativa do HTML5 que é mais segura
      const input = document.createElement('input');
      input.type = 'email';
      input.value = email;
      return input.validity.valid && input.value === email;
    } catch {
      return false;
    }
  };

  // Validação dos campos
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t('contact.form.nameRequired');
        if (value.trim().length < 2) return t('contact.form.nameMinLength');
        return undefined;

      case 'email':
        if (!value.trim()) return t('contact.form.emailRequired');
        if (!isValidEmail(value)) return t('contact.form.emailInvalid');
        return undefined;

      case 'message':
        if (!value.trim()) return t('contact.form.messageRequired');
        if (value.trim().length < 10) return t('contact.form.messageMinLength');
        return undefined;

      default:
        return undefined;
    }
  };

  // Validar todos os campos
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipular mudanças nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validação em tempo real apenas se o campo já foi tocado
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Manipular blur (quando sai do campo)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos os campos como tocados
    setTouched({
      name: true,
      email: true,
      message: true
    });

    if (!validateForm()) {
      // Focar no primeiro campo com erro
      const firstErrorField = Object.keys(errors)[0] as keyof FormData;
      if (firstErrorField === 'name') nameRef.current?.focus();
      else if (firstErrorField === 'email') emailRef.current?.focus();
      else if (firstErrorField === 'message') messageRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Enviar via EmailJS usando as credenciais existentes
      await emailjs.send(
        'service_4z3a60b',    // Service ID do EmailJS
        'template_nc73bg4',   // Template ID do EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'tbisp0@hotmail.com',
          subject: `Nova mensagem de contato de ${formData.name}`,
          reply_to: formData.email
        },
        'eRzZy4gTZ2NXGjFKz'  // User ID do EmailJS
      );

      // Sucesso
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setErrors({});

      // REMOVIDO: toast flutuante - agora só mostra mensagem embaixo do botão

    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setSubmitStatus('error');
      // REMOVIDO: toast flutuante - agora só mostra mensagem embaixo do botão
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUPER SIMPLES: só verifica se tem alguma coisa digitada
  const isFormValid = () => {
    return formData.name.length > 0 &&
           formData.email.length > 0 &&
           formData.message.length > 0;
  };

  // Verificar se campo individual está válido (para mostrar linha verde + ✓)
  const isFieldValid = (fieldName: keyof FormData): boolean => {
    if (!touched[fieldName] || !formData[fieldName]) return false;
    return !validateField(fieldName, formData[fieldName]);
  };

  // Verificar se campo tem erro (para mostrar linha vermelha + ✗)
  const hasFieldError = (fieldName: keyof FormData): boolean => {
    return touched[fieldName] && !!errors[fieldName];
  };

  return (
    <section id="contact" className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4">
          {t('contact.title')}
        </h1>
        <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
          {t('contact.description')}
        </p>
      </motion.div>

      {/* Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>

          {/* Campo Nome */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              <User className="inline w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.form.name')}
              <span className="text-[var(--color-error)] ml-1" aria-label={t('contact.form.required')}>*</span>
            </label>
            <div className="relative">
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  hasFieldError('name')
                    ? 'border-red-500 focus:ring-red-500'
                    : isFieldValid('name')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.namePlaceholder')}
                aria-invalid={hasFieldError('name') ? 'true' : 'false'}
                aria-describedby={hasFieldError('name') ? 'name-error' : undefined}
                autoComplete="name"
              />
              {/* Ícone de validação */}
              {hasFieldError('name') && (
                <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" aria-hidden="true" />
              )}
              {isFieldValid('name') && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
              )}
            </div>
            {errors.name && touched.name && (
              <p id="name-error" className="text-sm text-[var(--color-error)] flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              <Mail className="inline w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.form.email')}
              <span className="text-[var(--color-error)] ml-1" aria-label={t('contact.form.required')}>*</span>
            </label>
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  hasFieldError('email')
                    ? 'border-red-500 focus:ring-red-500'
                    : isFieldValid('email')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.emailPlaceholder')}
                aria-invalid={hasFieldError('email') ? 'true' : 'false'}
                aria-describedby={hasFieldError('email') ? 'email-error' : undefined}
                autoComplete="email"
                inputMode="email"
              />
              {/* Ícone de validação */}
              {hasFieldError('email') && (
                <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" aria-hidden="true" />
              )}
              {isFieldValid('email') && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
              )}
            </div>
            {errors.email && touched.email && (
              <p id="email-error" className="text-sm text-[var(--color-error)] flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Campo Mensagem */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              <MessageSquare className="inline w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.form.message')}
              <span className="text-[var(--color-error)] ml-1" aria-label={t('contact.form.required')}>*</span>
            </label>
            <div className="relative">
              <textarea
                ref={messageRef}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-vertical ${
                  hasFieldError('message')
                    ? 'border-red-500 focus:ring-red-500'
                    : isFieldValid('message')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.messagePlaceholder')}
                aria-invalid={hasFieldError('message') ? 'true' : 'false'}
                aria-describedby={hasFieldError('message') ? 'message-error' : 'message-hint'}
                minLength={10}
              />
              {/* Ícone de validação */}
              {hasFieldError('message') && (
                <X className="absolute right-3 top-3 w-5 h-5 text-red-500" aria-hidden="true" />
              )}
              {isFieldValid('message') && (
                <Check className="absolute right-3 top-3 w-5 h-5 text-green-500" aria-hidden="true" />
              )}
            </div>
            {errors.message && touched.message ? (
              <p id="message-error" className="text-sm text-[var(--color-error)] flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.message}
              </p>
            ) : (
              <p id="message-hint" className="text-xs text-[var(--color-muted)]">
                {t('contact.form.messageHint')}
              </p>
            )}
          </div>

          {/* Botão de Envio */}
          <div>
            <CTAButton
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              icon={Send}
              iconPosition="left"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full"
              ariaLabel={isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </CTAButton>

            {/* Mensagem de Privacidade - Integrada ao formulário */}
            <div className="mt-2 text-center">
              <p className="text-sm text-[var(--color-muted)] max-w-prose mx-auto">
                {t('contact.form.privacy')}
              </p>
            </div>
          </div>

          {/* Mensagens de Status - Embaixo do Botão */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium text-left">{t('contact.form.success')}</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium text-left">{t('contact.form.error')}</span>
            </motion.div>
          )}

        </form>

      </motion.div>



    </section>
  );
};

export default Contact;
