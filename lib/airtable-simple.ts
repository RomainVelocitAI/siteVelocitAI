import Airtable from 'airtable';

// Types pour la structure simplifiée des témoignages Airtable
export interface SimpleAirtableTestimonial {
  id: string;
  fields: {
    'Nom Entreprise': string;
    'Vidéo'?: Array<{ url: string; type: string }>;
    'Témoignage Écrit': string;
    'Thumbnail'?: Array<{ url: string }>;
    'Date de création'?: string;
  };
}

export interface SimpleFormattedTestimonial {
  id: string;
  name: string;
  company: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  // Pour la compatibilité avec le composant existant
  role: string;
  highlight: string;
  metrics: Array<{ label: string; value: string; icon?: string }>;
  rating: number;
  featured: boolean;
  tags: string[];
  date: string;
  ordre: number;
}

// Configuration Airtable
let airtableClient: Airtable | null = null;

export function getAirtableClient() {
  if (!airtableClient && process.env.AIRTABLE_API_KEY) {
    airtableClient = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    });
  }
  return airtableClient;
}

// Récupérer les témoignages depuis Airtable
export async function getSimpleTestimonials(): Promise<SimpleFormattedTestimonial[]> {
  const client = getAirtableClient();
  
  // Utiliser l'ID de table ou le nom si l'ID n'est pas défini (compatibilité)
  const tableIdentifier = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
  
  // Log pour débugger en production
  console.log('Airtable Config Check:', {
    hasClient: !!client,
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    hasTableId: !!process.env.AIRTABLE_TABLE_ID,
    hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
    baseId: process.env.AIRTABLE_BASE_ID?.substring(0, 10) + '...',
    tableIdentifier: tableIdentifier
  });
  
  if (!client || !process.env.AIRTABLE_BASE_ID || !tableIdentifier) {
    console.error('Configuration Airtable manquante:', {
      hasClient: !!client,
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasTableId: !!process.env.AIRTABLE_TABLE_ID,
      hasTableName: !!process.env.AIRTABLE_TABLE_NAME
    });
    return []; // Retourner tableau vide au lieu des fallback
  }

  try {
    const base = client.base(process.env.AIRTABLE_BASE_ID);
    const table = base(tableIdentifier);
    
    // Récupérer les records SANS timeout - attendre Airtable
    const records = await table
      .select({
        maxRecords: 20,
        view: "Grid view"
      })
      .all();

    console.log(`Récupération réussie: ${records.length} témoignages depuis Airtable`);
    
    const testimonials = records.map((record, index) => formatSimpleTestimonial(record as unknown as SimpleAirtableTestimonial, index)).filter(Boolean) as SimpleFormattedTestimonial[];
    
    // Si aucun témoignage valide, retourner tableau vide
    if (testimonials.length === 0) {
      console.warn('Aucun témoignage valide trouvé dans Airtable');
      return [];
    }
    
    return testimonials;
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages Airtable:', error);
    return []; // Retourner tableau vide au lieu des fallback
  }
}

// Formater un témoignage Airtable simple
function formatSimpleTestimonial(record: SimpleAirtableTestimonial, index: number): SimpleFormattedTestimonial | null {
  const { fields } = record;
  
  if (!fields['Nom Entreprise'] || !fields['Témoignage Écrit']) {
    return null;
  }

  // Extraire la vidéo URL si disponible
  const videoUrl = fields['Vidéo']?.[0]?.url || '';
  
  // Extraire le thumbnail ou utiliser une image par défaut
  const thumbnail = fields['Thumbnail']?.[0]?.url || '/images/default-testimonial.jpg';

  // Formater la date depuis Airtable
  let formattedDate = 'Récent';
  if (fields['Date de création']) {
    const date = new Date(fields['Date de création']);
    formattedDate = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  return {
    id: record.id,
    name: fields['Nom Entreprise'],
    company: fields['Nom Entreprise'], // Même valeur que le nom
    thumbnail: thumbnail,
    videoUrl: videoUrl,
    quote: fields['Témoignage Écrit'],
    // Valeurs par défaut pour la compatibilité
    role: 'Client VelocitAI',
    highlight: '',
    metrics: [], // Pas de métriques inventées
    rating: 5,
    featured: index === 0, // Le premier est featured
    tags: ['Automatisation', 'IA'],
    date: formattedDate,
    ordre: index + 1
  };
}

