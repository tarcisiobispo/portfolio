# i18n Troubleshooting & Usage Guide

This document provides guidance on how to use, diagnose, and troubleshoot the internationalization (i18n) system in this project.

## Quick Start

### Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description')}</p>
    </div>
  );
};
```

### Using the Trans Component for Complex Content

For translations with HTML or components inside:

```tsx
import { Trans } from '@/components/Trans';

const MyComponent = () => {
  return (
    <Trans 
      i18nKey="welcome.message" 
      components={{ 
        bold: <strong />,
        link: <a href="/about" />
      }}
    />
  );
};
```

In your translation file:
```json
{
  "welcome": {
    "message": "Welcome to our <bold>website</bold>! Learn more <link>about us</link>."
  }
}
```

## Switching Languages

```tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('pt-BR')}>Português</button>
      <button onClick={() => changeLanguage('en-US')}>English</button>
      <button onClick={() => changeLanguage('es-ES')}>Español</button>
    </div>
  );
};
```

## Common Issues and Solutions

### 1. Raw Translation Keys Showing Instead of Translated Text

**Symptoms**: You see `profile.greeting` instead of "Hello, I am"

**Possible Causes**:
- The translation key is not wrapped with `t()` function
- The key doesn't exist in the translation files
- i18n is not initialized before component rendering
- The wrong namespace is being used

**Solutions**:
- Ensure the key is wrapped with `t()`: `{t('profile.greeting')}`
- Check if the key exists in all language files
- Use the `<Trans>` component for complex content
- Verify i18n is imported and initialized before app mounting
- Check the browser console for i18n debug messages

### 2. Translations Not Working in Tooltips or Toasts

**Symptoms**: Tooltips or toasts show raw keys or don't translate properly

**Solutions**:
- For tooltips, use our enhanced tooltip component that handles translation keys
- For toasts, use the `useTranslatedToast` hook:
  ```tsx
  const { showToast } = useTranslatedToast();
  showToast({ titleKey: 'toast.success', descriptionKey: 'toast.saved' });
  ```

### 3. Language Switching Not Working

**Symptoms**: UI doesn't update when changing language

**Solutions**:
- Ensure components are using the `useTranslation` hook
- Check that the language resources are properly loaded
- Verify the language detector is configured correctly
- Try forcing a language: `i18n.changeLanguage('pt-BR')`

### 4. Missing Translation Keys

**Symptoms**: Console warnings about missing keys or fallback text showing

**Solutions**:
- Add the missing keys to all language files
- Use the DebugTranslations component in development to identify missing keys
- Enable debug mode in i18n config to see detailed logs

## Debugging Tools

### Enable Debug Mode

In development, you can enable debug mode to see detailed logs:

```tsx
// In i18n/config.ts
debug: import.meta.env.DEV
```

### Use the DebugTranslations Component

The DebugTranslations component shows the current language and tests critical translation keys:

```tsx
{import.meta.env.DEV && <DebugTranslations />}
```

### Check Browser Console

Look for messages with the 🌐 emoji in the browser console for i18n-related logs.

## Best Practices

1. **Always use translation keys**, never hardcode text
2. **Keep translation files organized** with nested objects for related content
3. **Use the same keys across all language files**
4. **Add new keys to all language files** at the same time
5. **Use the `<Trans>` component** for complex content with HTML
6. **Test all languages** before deploying
7. **Handle nested keys safely** to avoid runtime errors

## Adding New Languages

1. Create a new JSON file in the `src/i18n/locales` directory (e.g., `fr-FR.json`)
2. Copy the structure from an existing language file
3. Translate all the keys
4. Add the new language to the language switcher component
5. Update the i18n configuration to include the new language

## Need Help?

If you encounter issues not covered in this guide, check:
- The [react-i18next documentation](https://react.i18next.com/)
- The browser console for error messages
- The DebugTranslations component output