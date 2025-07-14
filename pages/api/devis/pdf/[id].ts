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

    // Générer le contenu du PDF
    const totalHT = fields['Total HT'] || 0;
    const dateCreation = fields['Date Création'] || new Date().toISOString().split('T')[0];
    
    const pdfContent = `
DEVIS ${id}
============================

Client: ${fields['Nom Prénom'] || ''}
Entreprise: ${fields['Entreprise'] || ''}
Email: ${fields['Email'] || ''}
Téléphone: ${fields['Téléphone'] || ''}

DÉTAILS DU DEVIS:
${fields['Devis Détaillé'] || ''}

Total: ${totalHT.toLocaleString('fr-FR')}€

Créé le: ${new Date(dateCreation).toLocaleDateString('fr-FR')}
Statut: ${fields['Statut'] || 'Créé'}

Notes: ${fields['Notes'] || ''}

VelocitAI - Automatisation d'entreprise
Le Tampon, La Réunion
contact@velocit-ai.fr | velocit-ai.fr
    `;

    // Retourner un fichier texte (plus tard on pourra générer un vrai PDF)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="devis-${id}.txt"`);
    res.status(200).send(pdfContent);

  } catch (error) {
    console.error('Erreur lors de la génération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}