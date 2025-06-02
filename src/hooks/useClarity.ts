import { useCallback } from 'react';

export const useClarity = () => {
  // Função para registrar eventos personalizados
  const trackEvent = useCallback((eventName: string) => {
    if (import.meta.env.PROD && typeof window !== 'undefined' && window.clarity) {
      try {
        window.clarity("event", eventName);
      } catch (error) {
        console.error('Failed to track Clarity event:', error);
      }
    }
  }, []);

  // Função para adicionar tags personalizadas
  const setTag = useCallback((key: string, value: string | string[]) => {
    if (import.meta.env.PROD && typeof window !== 'undefined' && window.clarity) {
      try {
        window.clarity("set", key, value);
      } catch (error) {
        console.error('Failed to set Clarity tag:', error);
      }
    }
  }, []);

  // Função para identificar usuário/sessão
  const identify = useCallback((
    customId: string,
    friendlyName?: string
  ) => {
    if (import.meta.env.PROD && typeof window !== 'undefined' && window.clarity) {
      try {
        window.clarity("identify", customId, friendlyName);
      } catch (error) {
        console.error('Failed to identify Clarity user:', error);
      }
    }
  }, []);

  // Função para upgrade de sessão (priorizar gravação)
  const upgradeSession = useCallback((reason: string) => {
    if (import.meta.env.PROD && typeof window !== 'undefined' && window.clarity) {
      try {
        window.clarity("upgrade", reason);
      } catch (error) {
        console.error('Failed to upgrade Clarity session:', error);
      }
    }
  }, []);

  return {
    trackEvent,
    setTag,
    identify,
    upgradeSession
  };
};

// Adicionar tipos para o objeto clarity global
declare global {
  interface Window {
    clarity: (command: string, ...args: any[]) => void;
  }
}