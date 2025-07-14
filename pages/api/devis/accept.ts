import { NextApiRequest, NextApiResponse } from 'next';

interface AcceptQuoteRequest {
  devisId: string;
  numeroDevis: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { devisId, numeroDevis }: AcceptQuoteRequest = req.body;

    if (!devisId || !numeroDevis) {
      return res.status(400).json({ error: 'ID devis et numéro devis requis' });
    }

    // Configuration Airtable
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = 'appRCCSf1bIo1iois';
    const AIRTABLE_TABLE_ID = 'tblVufTcqkATBP3vm';

    if (!AIRTABLE_API_KEY) {
      console.error('AIRTABLE_API_KEY non configurée');
      return res.status(500).json({ error: 'Configuration manquante' });
    }

    // Mettre à jour le statut dans Airtable
    const updateResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${devisId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Statut': 'Accepté'
          }
        })
      }
    );

    if (!updateResponse.ok) {
      console.error('Erreur mise à jour Airtable:', updateResponse.status);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }

    console.log('Devis accepté et mis à jour dans Airtable:', {
      devisId,
      numeroDevis
    });

    return res.status(200).json({ 
      success: true,
      message: 'Devis accepté avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'acceptation du devis:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}