import React from 'react';

export const sanitizeString = (str) => {
  // Eliminar etiquetas HTML
  let sanitized = str.replace(/<[^>]*>?/gm, '');
  
  // Convertir caracteres especiales HTML
  sanitized = sanitized.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(/"/g, '&quot;')
                       .replace(/'/g, '&#039;');
  
  // Eliminar caracteres no imprimibles y controlar espacios en blanco
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
                       .replace(/\s+/g, ' ').trim()
                       .toLowerCase();
  
  return sanitized;
};

//defaultsanitizeString;