import { QuoteData } from './quoteEncryption';

// Services prédéfinis avec leurs tarifs
export const PREDEFINED_SERVICES = {
  // Audit et Stratégie
  'audit-strategique': {
    name: 'Audit Stratégique Personnalisé',
    description: 'Évaluation complète des processus d\'entreprise avec identification des opportunités d\'automatisation prioritaires',
    unitPrice: 1500,
    category: 'Audit & Stratégie'
  },
  'audit-complet': {
    name: 'Audit Complet d\'Enterprise',
    description: 'Analyse approfondie de tous les processus métier avec roadmap de transformation digitale',
    unitPrice: 3500,
    category: 'Audit & Stratégie'
  },
  
  // Automatisation
  'automatisation-workflow': {
    name: 'Automatisation de Workflow',
    description: 'Automatisation d\'un processus métier spécifique avec outils no-code/low-code',
    unitPrice: 2500,
    category: 'Automatisation'
  },
  'chatbot-ia': {
    name: 'Chatbot IA Personnalisé',
    description: 'Développement et intégration d\'un assistant IA pour support client automatisé',
    unitPrice: 4000,
    category: 'Intelligence Artificielle'
  },
  'integration-crm': {
    name: 'Intégration CRM Avancée',
    description: 'Mise en place et automatisation complète du pipeline commercial avec CRM',
    unitPrice: 3000,
    category: 'Automatisation'
  },
  
  // Formation et Support
  'formation-equipe': {
    name: 'Formation Équipe IA',
    description: 'Formation complète de l\'équipe aux outils d\'automatisation et d\'IA',
    unitPrice: 1200,
    category: 'Formation'
  },
  'support-premium': {
    name: 'Support Premium 6 mois',
    description: 'Support technique dédié et maintenance pendant 6 mois',
    unitPrice: 800,
    category: 'Support'
  },
  
  // Solutions Spécialisées
  'dashboard-bi': {
    name: 'Dashboard Business Intelligence',
    description: 'Création de tableaux de bord personnalisés avec analyse prédictive',
    unitPrice: 2800,
    category: 'Business Intelligence'
  },
  'optimisation-seo': {
    name: 'Optimisation SEO Automatisée',
    description: 'Mise en place d\'outils d\'optimisation SEO automatiques',
    unitPrice: 1800,
    category: 'Marketing Digital'
  }
};

export interface QuoteRequest {
  command: string;
}

export interface ParsedQuoteData {
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
}

/**
 * Parse une commande naturelle pour extraire les données du devis
 * Exemple: "genere un devis pour Marc Dubois (marc@exemple.fr) avec audit strategique et chatbot ia"
 */
export function parseQuoteCommand(command: string): ParsedQuoteData | null {
  const lowerCommand = command.toLowerCase();
  
  // Extraire le nom du client
  const nameMatch = lowerCommand.match(/pour\s+([^(]+?)(?:\s*\(|$)/);
  if (!nameMatch) {
    throw new Error('Nom du client non trouvé. Format attendu: "pour [Nom Client]"');
  }
  
  const clientName = nameMatch[1].trim();
  
  // Extraire l'email
  const emailMatch = command.match(/\(([^)]*@[^)]*)\)/);
  if (!emailMatch) {
    throw new Error('Email non trouvé. Format attendu: "(email@exemple.fr)"');
  }
  
  const clientEmail = emailMatch[1].trim();
  
  // Extraire l'entreprise (optionnel)
  const companyMatch = lowerCommand.match(/(?:de |chez |entreprise )([^,\s]+(?:\s+[^,\s]+)*)/);
  const clientCompany = companyMatch ? companyMatch[1].trim() : undefined;
  
  // Identifier les services demandés
  const services: ParsedQuoteData['services'] = [];
  
  // Chercher les services dans la commande
  for (const [key, serviceTemplate] of Object.entries(PREDEFINED_SERVICES)) {
    const serviceKeywords = key.split('-');
    const hasAllKeywords = serviceKeywords.every(keyword => 
      lowerCommand.includes(keyword.replace('-', ' '))
    );
    
    if (hasAllKeywords) {
      // Chercher une quantité spécifique
      const quantityMatch = lowerCommand.match(new RegExp(`(\\d+)\\s*(?:x\\s*)?${serviceKeywords.join('\\s*')}`));
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
      
      services.push({
        ...serviceTemplate,
        quantity
      });
    }
  }
  
  // Chercher des services personnalisés
  const customServiceMatch = lowerCommand.match(/avec\s+(.+?)(?:\s+pour|$)/);
  if (customServiceMatch && services.length === 0) {
    const customDescription = customServiceMatch[1].trim();
    services.push({
      name: 'Service Personnalisé',
      description: customDescription,
      quantity: 1,
      unitPrice: 2000, // Prix par défaut
      category: 'Sur-mesure'
    });
  }
  
  if (services.length === 0) {
    throw new Error('Aucun service identifié. Spécifiez les services souhaités.');
  }
  
  // Extraire la durée de validité (optionnel)
  const validityMatch = lowerCommand.match(/(?:valable|validite)\s+(\d+)\s*jours?/);
  const validityDays = validityMatch ? parseInt(validityMatch[1]) : 30;
  
  // Extraire les personnalisations (optionnel)
  const customMatch = lowerCommand.match(/note[s]?\s*:\s*(.+?)(?:\.|$)/);
  const customizations = customMatch ? customMatch[1].trim() : undefined;
  
  return {
    clientName,
    clientCompany,
    clientEmail,
    services,
    customizations,
    validityDays
  };
}

/**
 * Génère un devis à partir d'une commande naturelle
 */
export async function generateQuoteFromCommand(command: string): Promise<{
  success: boolean;
  quoteData?: QuoteData;
  quoteUrl?: string;
  error?: string;
}> {
  try {
    const parsedData = parseQuoteCommand(command);
    
    if (!parsedData) {
      return {
        success: false,
        error: 'Impossible de parser la commande'
      };
    }
    
    // Faire l'appel API pour générer le devis
    const response = await fetch('/api/devis/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedData)
    });
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
}

/**
 * Liste des services disponibles pour aide
 */
export function getAvailableServices(): string[] {
  return Object.keys(PREDEFINED_SERVICES).map(key => {
    const service = PREDEFINED_SERVICES[key as keyof typeof PREDEFINED_SERVICES];
    return `${key}: ${service.name} (${service.unitPrice}€)`;
  });
}

/**
 * Exemples de commandes pour documentation
 */
export const COMMAND_EXAMPLES = [
  'genere un devis pour Marc Dubois (marc.dubois@entreprise.fr) avec audit strategique et formation equipe',
  'cree un devis pour Sophie Martin (sophie@startup.com) de TechStart avec chatbot ia et support premium',
  'nouveau devis pour Jean Leroy (jean.leroy@commerce.re) avec automatisation workflow et dashboard bi, note: focus sur e-commerce',
  'devis pour Marie Rousseau (marie@conseil.fr) avec audit complet, validite 45 jours'
];