import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
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

  // Validação de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação dos campos
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t('contact.errors.nameRequired');
        if (value.trim().length < 2) return t('contact.errors.nameMinLength');
        return undefined;

      case 'email':
        if (!value.trim()) return t('contact.errors.emailRequired');
        if (!isValidEmail(value)) return t('contact.errors.emailInvalid');
        return undefined;

      case 'message':
        if (!value.trim()) return t('contact.errors.messageRequired');
        if (value.trim().length < 10) return t('contact.errors.messageMinLength');
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

      toast.success(t('contact.success.title'), {
        description: t('contact.success.description'),
        duration: 5000,
      });

    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setSubmitStatus('error');
      toast.error(t('contact.error.title'), {
        description: t('contact.error.description'),
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verificar se o formulário é válido - SIMPLES: só precisa ter o mínimo
  const isFormValid = () => {
    const hasName = formData.name.trim().length >= 2;
    const hasEmail = formData.email.trim().length > 0 && formData.email.includes('@');
    const hasMessage = formData.message.trim().length >= 10;

    return hasName && hasEmail && hasMessage;
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
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.name && touched.name
                    ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.namePlaceholder')}
                aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && touched.name && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-error)]" aria-hidden="true" />
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
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.email && touched.email
                    ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.emailPlaceholder')}
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && touched.email && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-error)]" aria-hidden="true" />
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
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-vertical ${
                  errors.message && touched.message
                    ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.messagePlaceholder')}
                aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                aria-describedby={errors.message && touched.message ? 'message-error' : 'message-hint'}
                minLength={10}
              />
              {errors.message && touched.message && (
                <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-[var(--color-error)]" aria-hidden="true" />
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
              disabled={!isFormValid() || isSubmitting}
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

          {/* Status de Sucesso */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-lg text-[var(--color-success)]"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium">{t('contact.success.message')}</span>
            </motion.div>
          )}

        </form>

      </motion.div>



    </section>
  );
};

export default Contact;
