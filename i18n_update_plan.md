# Plano para Adicionar/Atualizar Traduções Específicas

## 1. Objetivo:
Garantir que as chaves `contact.errors.messageMinLength` e `contact.success.message` estejam corretamente traduzidas e presentes em português, inglês e espanhol, nos arquivos de internacionalização relevantes.

## 2. Detalhes das Traduções:

### Chave de Erro: `contact.errors.messageMinLength`
*   **Português (pt-BR):** "Sua mensagem precisa ter pelo menos {{count}} caracteres."
*   **Inglês (en-US):** "Your message must be at least {{count}} characters long."
*   **Espanhol (es-ES):** "Tu mensaje debe tener al menos {{count}} caracteres."

*(Nota: `{{count}}` é um placeholder para interpolação do i18next, onde a aplicação fornecerá o número exato.)*

### Chave de Sucesso: `contact.success.message`
*   **Português (pt-BR):** "Sua mensagem foi enviada com sucesso!"
*   **Inglês (en-US):** "Your message was sent successfully!"
*   **Espanhol (es-ES):** "¡Tu mensaje fue enviado exitosamente!"

*(Nota: Estas traduções de sucesso provavelmente já existem e apenas precisam ser confirmadas.)*

## 3. Arquivos a Serem Modificados (pelo modo de implementação):
*   `src/i18n/config.ts` (para atualizar a tradução `pt-BR` de `contact.errors.messageMinLength` no objeto `resources` embutido).
*   `src/i18n/locales/pt-BR.ts` (para atualizar a tradução `pt-BR` de `contact.errors.messageMinLength`, que é usada para tipagem).
*   `src/i18n/locales/pt-BR.json` (para atualizar/confirmar `contact.errors.messageMinLength` e `contact.success.message`).
*   `src/i18n/locales/en-US.json` (para adicionar/atualizar `contact.errors.messageMinLength` e confirmar `contact.success.message`).
*   `src/i18n/locales/es-ES.json` (para adicionar/atualizar `contact.errors.messageMinLength` e confirmar `contact.success.message`).