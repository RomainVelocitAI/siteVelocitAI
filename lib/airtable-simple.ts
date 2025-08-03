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
  companyLogo?: string;
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
  
  if (!client || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_TABLE_NAME) {
    console.error('Configuration Airtable manquante');
    return getFallbackTestimonials();
  }

  try {
    const base = client.base(process.env.AIRTABLE_BASE_ID);
    const table = base(process.env.AIRTABLE_TABLE_NAME);
    
    const records = await table
      .select({
        maxRecords: 20,
        view: "Grid view"
      })
      .all();

    return records.map((record, index) => formatSimpleTestimonial(record as unknown as SimpleAirtableTestimonial, index)).filter(Boolean) as SimpleFormattedTestimonial[];
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    return getFallbackTestimonials();
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
    companyLogo: undefined, // Peut être ajouté plus tard dans Airtable
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

// Témoignages de fallback si Airtable n'est pas disponible
function getFallbackTestimonials(): SimpleFormattedTestimonial[] {
  return [
    {
      id: '1',
      name: 'Caillot Immobilier',
      company: 'Caillot Immobilier',
      companyLogo: undefined,
      role: 'Client VelocitAI',
      thumbnail: '/images/romain_miniature.png',
      videoUrl: 'videos/romain_temoignage.mp4',
      quote: "VelocitAI a transformé notre façon de travailler. Les résultats dépassent toutes nos attentes.",
      highlight: "3x plus de dossiers traités",
      metrics: [],
      rating: 5,
      featured: true,
      tags: ['Immobilier', 'Automatisation', 'IA'],
      date: 'Décembre 2023',
      ordre: 1
    },
    {
      id: '2',
      name: 'Scaleable Agency',
      company: 'Scaleable Agency',
      companyLogo: undefined,
      role: 'Client VelocitAI',
      thumbnail: '/images/julien_miniature.png',
      videoUrl: 'videos/julien_temoignage.mp4',
      quote: "Une expertise technique exceptionnelle doublée d'une compréhension profonde des enjeux business.",
      highlight: "Croissance x2 sans coûts supplémentaires",
      metrics: [],
      rating: 5,
      featured: false,
      tags: ['Marketing', 'Growth', 'SaaS'],
      date: 'Novembre 2023',
      ordre: 2
    },
    {
      id: '3',
      name: 'Douceur Passion',
      company: 'Douceur Passion',
      companyLogo: undefined,
      role: 'Client VelocitAI',
      thumbnail: '/images/anna_miniature.png',
      videoUrl: 'videos/anna_temoignage.mp4',
      quote: "L'automatisation m'a permis de me concentrer sur l'essentiel : accompagner mes clients.",
      highlight: "20h/semaine économisées",
      metrics: [],
      rating: 5,
      featured: false,
      tags: ['Coaching', 'Formation', 'B2B'],
      date: 'Octobre 2023',
      ordre: 3
    }
  ];
}