import type { NextApiRequest, NextApiResponse } from 'next';
import { getTestimonials } from '@/lib/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Autoriser uniquement GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Récupérer les témoignages depuis Airtable
    const testimonials = await getTestimonials();
    
    // Mettre en cache pour 1 heure
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    res.status(200).json({ testimonials });
  } catch (error) {
    console.error('Erreur API témoignages:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des témoignages' });
  }
}