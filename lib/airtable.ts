import Airtable from 'airtable';

// Types pour les témoignages Airtable
export interface AirtableTestimonial {
  id: string;
  fields: {
    name: string;
    role: string;
    company: string;
    companyLogo?: {
      url: string;
    }[];
    thumbnail?: {
      url: string;
    }[];
    videoUrl?: string;
    quote: string;
    highlight?: string;
    metrics?: string; // JSON string avec les métriques
    rating?: number;
    featured?: boolean;
    tags?: string[];
    date?: string;
    ordre?: number;
    statut?: 'actif' | 'inactif';
  };
}

export interface FormattedTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
  highlight?: string;
  metrics: {
    label: string;
    value: string;
    icon?: string;
  }[];
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
export async function getTestimonials(): Promise<FormattedTestimonial[]> {
  const client = getAirtableClient();
  
  // Utiliser l'ID de table ou le nom si l'ID n'est pas défini (compatibilité)
  const tableIdentifier = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
  
  if (!client || !process.env.AIRTABLE_BASE_ID || !tableIdentifier) {
    console.error('Configuration Airtable manquante');
    return getFallbackTestimonials();
  }

  try {
    const base = client.base(process.env.AIRTABLE_BASE_ID);
    const table = base(tableIdentifier);
    
    const records = await table
      .select({
        filterByFormula: "{statut} = 'actif'"
      })
      .all();

    return records.map(record => formatTestimonial(record as unknown as AirtableTestimonial)).filter(Boolean) as FormattedTestimonial[];
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    return getFallbackTestimonials();
  }
}

// Formater un témoignage Airtable
function formatTestimonial(record: AirtableTestimonial): FormattedTestimonial | null {
  const { fields } = record;
  
  if (!fields.name || !fields.quote) {
    return null;
  }

  // Parser les métriques JSON si présentes
  let metrics = [];
  if (fields.metrics) {
    try {
      metrics = JSON.parse(fields.metrics);
    } catch (e) {
      console.error('Erreur parsing métriques:', e);
      metrics = [];
    }
  }

  return {
    id: record.id,
    name: fields.name,
    role: fields.role || '',
    company: fields.company || '',
    companyLogo: fields.companyLogo?.[0]?.url,
    thumbnail: fields.thumbnail?.[0]?.url || '/images/default-testimonial.jpg',
    videoUrl: fields.videoUrl || '',
    quote: fields.quote,
    highlight: fields.highlight || '',
    metrics: metrics,
    rating: fields.rating || 5,
    featured: fields.featured || false,
    tags: fields.tags || [],
    date: fields.date || new Date().toISOString(),
    ordre: fields.ordre || 999
  };
}

// Témoignages de fallback si Airtable n'est pas disponible
function getFallbackTestimonials(): FormattedTestimonial[] {
  return [
    {
      id: '1',
      name: 'Romain Caillot',
      role: 'Gérant',
      company: 'Caillot Immobilier',
      thumbnail: '/images/romain_miniature.png',
      videoUrl: 'videos/romain_temoignage.mp4',
      quote: "VelocitAI a transformé notre façon de travailler. Les résultats dépassent toutes nos attentes.",
      highlight: "3x plus de dossiers traités",
      metrics: [
        { label: 'Gain de temps', value: '+75%', icon: 'chart' },
        { label: 'ROI', value: '420%', icon: 'trending' },
      ],
      rating: 5,
      featured: true,
      tags: ['Immobilier', 'Automatisation', 'IA'],
      date: 'Décembre 2023',
      ordre: 1
    },
    {
      id: '2',
      name: 'Julien Etoke',
      role: 'Gérant',
      company: 'Scaleable Agency',
      thumbnail: '/images/julien_miniature.png',
      videoUrl: 'videos/julien_temoignage.mp4',
      quote: "Une expertise technique exceptionnelle doublée d'une compréhension profonde des enjeux business.",
      highlight: "Croissance x2 sans coûts supplémentaires",
      metrics: [
        { label: 'Productivité', value: '+90%', icon: 'sparkles' },
        { label: 'Clients satisfaits', value: '100%', icon: 'check' },
      ],
      rating: 5,
      featured: false,
      tags: ['Marketing', 'Growth', 'SaaS'],
      date: 'Novembre 2023',
      ordre: 2
    },
    {
      id: '3',
      name: 'Anna Grieux',
      role: 'Coach en entreprise',
      company: 'Douceur Passion',
      thumbnail: '/images/anna_miniature.png',
      videoUrl: 'videos/anna_temoignage.mp4',
      quote: "L'automatisation m'a permis de me concentrer sur l'essentiel : accompagner mes clients.",
      highlight: "20h/semaine économisées",
      metrics: [
        { label: 'Temps économisé', value: '20h/sem', icon: 'clock' },
        { label: 'Croissance', value: '+150%', icon: 'trending' },
      ],
      rating: 5,
      featured: false,
      tags: ['Coaching', 'Formation', 'B2B'],
      date: 'Octobre 2023',
      ordre: 3
    }
  ];
}