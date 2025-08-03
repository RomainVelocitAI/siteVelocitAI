import type { NextApiRequest, NextApiResponse } from 'next';
import { getSimpleTestimonials } from '../../lib/airtable-simple';

type Data = {
  testimonials: any[];
  error?: string;
};

// Cache simple en mémoire
let cache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Vérifier le cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return res.status(200).json({ testimonials: cache.data });
  }

  try {
    const testimonials = await getSimpleTestimonials();
    
    // Mettre en cache
    cache = {
      data: testimonials,
      timestamp: Date.now()
    };
    
    res.status(200).json({ testimonials });
  } catch (error) {
    console.error('Erreur API testimonials:', error);
    res.status(500).json({ 
      testimonials: [],
      error: 'Erreur lors de la récupération des témoignages'
    });
  }
}