import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, LucideIcon } from 'lucide-react';

interface FloatingLabelTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  minLength?: number;
  maxLength?: number;
  icon?: LucideIcon;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  hint?: string;
  'aria-describedby'?: string;
}

const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  label,
  placeholder,
  error,
  touched = false,
  required = false,
  disabled = false,
  rows = 4,
  minLength,
  maxLength,
  icon: Icon,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  hint,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine if label should be floating
  const isFloating = isFocused || value.length > 0;
  const hasError = error && touched;

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Label animation variants
  const labelVariants = {
    default: {
      top: '1rem',
      left: Icon ? '2.75rem' : '1rem',
      transform: 'translateY(0%)',
      fontSize: '1rem',
      color: 'var(--color-muted)',
      zIndex: 1,
    },
    floating: {
      top: '-0.5rem',
      left: '0.75rem',
      transform: 'translateY(0%)',
      fontSize: '0.75rem',
      color: isFocused ? 'var(--color-primary)' : 'var(--color-text)',
      zIndex: 2,
    }
  };

  // Textarea border and ring colors
  const getBorderClasses = () => {
    if (hasError) {
      return 'border-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-[var(--color-error)]';
    }
    if (isFocused) {
      return 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20';
    }
    return 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50';
  };

  // Character count
  const characterCount = value.length;
  const showCharacterCount = maxLength && (isFocused || characterCount > maxLength * 0.8);

  return (
    <div className={`relative ${className}`}>
      {/* Textarea Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-3 top-4 z-10">
            <Icon 
              className={`w-4 h-4 transition-colors duration-200 ${
                isFocused 
                  ? 'text-[var(--color-primary)]' 
                  : hasError 
                    ? 'text-[var(--color-error)]'
                    : 'text-[var(--color-muted)]'
              }`} 
              aria-hidden="true" 
            />
          </div>
        )}

        {/* Textarea Field */}
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          rows={rows}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200 
            bg-[var(--color-surface)] text-[var(--color-text)] 
            focus:outline-none focus:border-transparent resize-vertical
            ${Icon ? 'pl-11' : 'pl-4'}
            ${getBorderClasses()}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${textareaClassName}
          `}
          placeholder={isFloating ? placeholder : ''}
          {...props}
        />

        {/* Floating Label */}
        <motion.label
          htmlFor={id}
          className={`
            absolute pointer-events-none select-none font-medium transition-all duration-200
            bg-[var(--color-surface)] px-2 rounded
            ${labelClassName}
          `}
          variants={labelVariants}
          animate={isFloating ? 'floating' : 'default'}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {label}
          {required && (
            <span 
              className="text-[var(--color-error)] ml-1" 
              aria-label="required field"
            >
              *
            </span>
          )}
        </motion.label>

        {/* Error Icon */}
        {hasError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-3 top-3"
          >
            <AlertCircle 
              className="w-5 h-5 text-[var(--color-error)]" 
              aria-hidden="true" 
            />
          </motion.div>
        )}

        {/* Character Count */}
        {showCharacterCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-2 right-3"
          >
            <span 
              className={`text-xs ${
                maxLength && characterCount > maxLength 
                  ? 'text-[var(--color-error)]' 
                  : 'text-[var(--color-muted)]'
              }`}
            >
              {characterCount}{maxLength && `/${maxLength}`}
            </span>
          </motion.div>
        )}
      </div>

      {/* Error Message or Hint */}
      <AnimatePresence>
        {hasError ? (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2"
          >
            <p 
              id={`${id}-error`}
              className="text-sm text-[var(--color-error)] flex items-center gap-1" 
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {error}
            </p>
          </motion.div>
        ) : hint ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2"
          >
            <p 
              id={`${id}-hint`}
              className="text-xs text-[var(--color-muted)]"
            >
              {hint}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default FloatingLabelTextarea;
