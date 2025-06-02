import { isValidImageUrl, sanitizeImageUrl } from './urlSecurity';

/**
 * Validates and sanitizes project image URLs
 */
export const validateProjectImageUrl = (url: string): string | null => {
  if (!url || typeof url !== 'string') {
    console.warn('Invalid project image URL provided:', url);
    return null;
  }

  // Sanitize the URL
  const sanitizedUrl = sanitizeImageUrl(url);
  
  if (!sanitizedUrl) {
    console.warn('Project image URL failed security validation:', url);
    return null;
  }

  return sanitizedUrl;
};

/**
 * Validates an array of project image URLs
 */
export const validateProjectImages = (projects: Array<{ imageUrl: string; [key: string]: any }>): Array<{ imageUrl: string; [key: string]: any }> => {
  return projects.map(project => {
    const validatedUrl = validateProjectImageUrl(project.imageUrl);
    
    return {
      ...project,
      imageUrl: validatedUrl || '/images/placeholder-project.jpg' // Fallback to local placeholder
    };
  });
};