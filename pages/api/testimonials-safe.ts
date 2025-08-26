import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchWithCache, fetchAirtable } from '@/lib/api-wrapper';

// Données de fallback en cas d'erreur
const FALLBACK_TESTIMONIALS = [
  {
    id: '1',
    name: 'Client VelocitAI',
    company: 'Entreprise locale',
    content: 'Excellente solution d\'automatisation pour notre entreprise.',
    rating: 5,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Headers de cache pour réduire les appels
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  try {
    // Utiliser le cache pour éviter les appels répétés
    const testimonials = await fetchWithCache(
      'testimonials',
      async () => {
        // Appel Airtable avec timeout et retry
        const baseId = process.env.AIRTABLE_BASE_ID;
        const tableId = process.env.AIRTABLE_TABLE_ID;
        
        if (!baseId || !tableId) {
          console.warn('Airtable configuration missing');
          return FALLBACK_TESTIMONIALS;
        }
        
        const data = await fetchAirtable(
          `${baseId}/${tableId}?maxRecords=10&view=Grid%20view`
        );
        
        // Si pas de données, utiliser le fallback
        if (!data || !data.records) {
          return FALLBACK_TESTIMONIALS;
        }
        
        // Transformer les données Airtable
        return data.records.map((record: any) => ({
          id: record.id,
          name: record.fields.Name || 'Client',
          company: record.fields.Company || '',
          content: record.fields.Content || '',
          rating: record.fields.Rating || 5,
        }));
      },
      300000 // Cache de 5 minutes
    );
    
    res.status(200).json({ 
      success: true, 
      data: testimonials 
    });
    
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    
    // En cas d'erreur, retourner les données de fallback
    res.status(200).json({ 
      success: true, 
      data: FALLBACK_TESTIMONIALS,
      fallback: true 
    });
  }
}