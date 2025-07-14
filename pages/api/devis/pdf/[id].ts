import { NextApiRequest, NextApiResponse } from 'next';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_DEVIS_BASE_ID;
const AIRTABLE_TABLE_ID = 'tblVufTcqkATBP3vm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Headers pour forcer le téléchargement
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID devis invalide' });
    }

    // Récupérer les données du devis depuis Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      return res.status(404).json({ error: 'Devis introuvable' });
    }

    const record = await response.json();
    const fields = record.fields;

    // Vérifier si un PDF existe déjà dans Airtable
    const pdfAttachment = fields['PDF Devis']?.[0];
    
    if (pdfAttachment && pdfAttachment.url) {
      // Rediriger vers le PDF stocké dans Airtable
      return res.redirect(302, pdfAttachment.url);
    } else {
      // Pas de PDF trouvé, générer un nouveau
      return res.status(404).json({ 
        error: 'PDF non trouvé. Veuillez générer le PDF d\'abord.',
        needsGeneration: true 
      });
    }

  } catch (error) {
    console.error('Erreur lors de la récupération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}