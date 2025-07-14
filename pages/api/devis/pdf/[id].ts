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

    // Préparer les données
    const totalHT = fields['Total HT'] || 0;
    const dateCreation = fields['Date Création'] || new Date().toISOString().split('T')[0];
    const entreprise = fields['Entreprise'] || '';
    const isMonthly = fields['Devis Détaillé']?.includes('/mois') || false;
    
    // Générer un fichier texte bien formaté
    const pdfContent = `
DEVIS VELOCITAI - ${entreprise.toUpperCase()}
${'='.repeat(60)}

INFORMATIONS CLIENT
${'-'.repeat(30)}
Nom: ${fields['Nom Prénom'] || ''}
Entreprise: ${entreprise}
Email: ${fields['Email'] || ''}
Téléphone: ${fields['Téléphone'] || 'Non renseigné'}
Date de création: ${new Date(dateCreation).toLocaleDateString('fr-FR')}
Numéro de devis: ${id}

DÉTAILS DU DEVIS
${'-'.repeat(30)}
${fields['Devis Détaillé'] || ''}

RÉCAPITULATIF FINANCIER
${'-'.repeat(30)}
Total HT: ${totalHT.toLocaleString('fr-FR')}€${isMonthly ? '/mois' : ''}
TVA (0%): 0€
Total TTC: ${totalHT.toLocaleString('fr-FR')}€${isMonthly ? '/mois' : ''}

VALIDITÉ: 30 jours à compter de la date de création

${fields['Notes'] ? `NOTES:\n${fields['Notes']}\n` : ''}

${'='.repeat(60)}
VelocitAI - Automatisation d'entreprise
📍 Le Tampon, La Réunion
📧 contact@velocit-ai.fr
🌐 velocit-ai.fr

Devis généré automatiquement
Mentions légales disponibles sur velocit-ai.fr
${'='.repeat(60)}
`;

    // Retourner un fichier texte bien formaté
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="devis-${entreprise}-${id}.txt"`);
    res.status(200).send(pdfContent);

  } catch (error) {
    console.error('Erreur lors de la génération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}