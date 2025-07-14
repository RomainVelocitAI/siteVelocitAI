import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

// Clé de chiffrement - à mettre en variable d'environnement en production
const ENCRYPTION_KEY = process.env.QUOTE_ENCRYPTION_KEY || 'VEL0C1TAI-SUPER-SECRET-KEY-2025';

export interface QuoteData {
  id: string;
  quoteNumber: string;
  client: {
    name: string;
    company?: string;
    email: string;
  };
  services: Array<{
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    category: string;
  }>;
  totals: {
    subtotalHT: number;
    tva: number;
    totalTTC: number;
    tvaRate: number;
  };
  meta: {
    createdAt: string;
    expiresAt: string;
    status: 'draft' | 'sent' | 'accepted' | 'refused' | 'expired';
    customizations?: string;
  };
}

/**
 * Génère un numéro de devis unique
 */
export function generateQuoteNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');
  
  return `VEL-${year}${month}${day}-${random}`;
}

/**
 * Chiffre les données du devis et génère un hash pour l'URL
 */
export function encryptQuoteData(quoteData: QuoteData): string {
  try {
    // Convertir en JSON
    const jsonString = JSON.stringify(quoteData);
    
    // Chiffrer les données
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
    
    // Encoder en base64 URL-safe
    const urlSafe = encrypted
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return urlSafe;
  } catch (error) {
    console.error('Erreur lors du chiffrement:', error);
    throw new Error('Impossible de chiffrer les données du devis');
  }
}

/**
 * Déchiffre les données du devis à partir du hash
 */
export function decryptQuoteData(hash: string): QuoteData | null {
  try {
    // Restaurer le format base64 standard
    let base64 = hash
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Ajouter le padding si nécessaire
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Déchiffrer
    const decrypted = CryptoJS.AES.decrypt(base64, ENCRYPTION_KEY);
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!jsonString) {
      return null;
    }
    
    // Parser le JSON
    const quoteData = JSON.parse(jsonString) as QuoteData;
    
    // Vérifier l'expiration
    const now = new Date();
    const expiresAt = new Date(quoteData.meta.expiresAt);
    
    if (now > expiresAt) {
      quoteData.meta.status = 'expired';
    }
    
    return quoteData;
  } catch (error) {
    console.error('Erreur lors du déchiffrement:', error);
    return null;
  }
}

/**
 * Crée un objet QuoteData complet à partir des données basiques
 */
export function createQuoteData(input: {
  clientName: string;
  clientCompany?: string;
  clientEmail: string;
  services: Array<{
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    category: string;
  }>;
  customizations?: string;
  validityDays?: number;
}): QuoteData {
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + (input.validityDays || 30));
  
  // Calculer les totaux
  const subtotalHT = input.services.reduce((sum, service) => 
    sum + (service.quantity * service.unitPrice), 0
  );
  
  const tvaRate = 8.5; // TVA à La Réunion
  const tva = Math.round(subtotalHT * (tvaRate / 100) * 100) / 100;
  const totalTTC = subtotalHT + tva;
  
  // Ajouter les totaux aux services
  const servicesWithTotals = input.services.map(service => ({
    ...service,
    total: service.quantity * service.unitPrice
  }));
  
  return {
    id: uuidv4(),
    quoteNumber: generateQuoteNumber(),
    client: {
      name: input.clientName,
      company: input.clientCompany,
      email: input.clientEmail
    },
    services: servicesWithTotals,
    totals: {
      subtotalHT: Math.round(subtotalHT * 100) / 100,
      tva: tva,
      totalTTC: Math.round(totalTTC * 100) / 100,
      tvaRate
    },
    meta: {
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      status: 'draft',
      customizations: input.customizations
    }
  };
}

/**
 * Génère l'URL complète du devis
 */
export function generateQuoteUrl(quoteData: QuoteData, baseUrl?: string): string {
  const hash = encryptQuoteData(quoteData);
  const base = baseUrl || 'https://velocit-ai.fr';
  return `${base}/devis/${hash}`;
}

/**
 * Valide si un hash de devis est valide et non expiré
 */
export function validateQuoteHash(hash: string): { valid: boolean; expired: boolean; data: QuoteData | null } {
  const data = decryptQuoteData(hash);
  
  if (!data) {
    return { valid: false, expired: false, data: null };
  }
  
  const now = new Date();
  const expiresAt = new Date(data.meta.expiresAt);
  const expired = now > expiresAt;
  
  return {
    valid: true,
    expired,
    data: expired ? { ...data, meta: { ...data.meta, status: 'expired' } } : data
  };
}