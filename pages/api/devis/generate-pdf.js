const { generateDevisPDF } = require('../../../utils/generatePDF');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_DEVIS_BASE_ID;
const AIRTABLE_TABLE_ID = 'tblVufTcqkATBP3vm';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recordId } = req.body;

    if (!recordId) {
      return res.status(400).json({ error: 'Record ID requis' });
    }

    // Récupérer les données du devis depuis Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${recordId}`,
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

    // Préparer les données pour le PDF
    const devisData = {
      numeroDevis: recordId,
      nom: fields['Nom Prénom'] || '',
      entreprise: fields['Entreprise'] || '',
      email: fields['Email'] || '',
      telephone: fields['Téléphone'] || '',
      devisDetaille: fields['Devis Détaillé'] || '',
      totalHT: fields['Total HT'] || 0,
      statut: fields['Statut'] || 'Créé',
      dateCreation: fields['Date Création'] || new Date().toISOString().split('T')[0],
      notes: fields['Notes'] || ''
    };

    // Générer le PDF
    const pdfBuffer = await generateDevisPDF(devisData);

    // Convertir en base64 pour Airtable
    const pdfBase64 = pdfBuffer.toString('base64');

    // Uploader vers Airtable
    const uploadResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'PDF Devis': [
              {
                filename: `devis-${devisData.entreprise}-${recordId}.pdf`,
                url: `data:application/pdf;base64,${pdfBase64}`
              }
            ]
          }
        })
      }
    );

    if (!uploadResponse.ok) {
      console.error('Erreur upload Airtable:', await uploadResponse.text());
      return res.status(500).json({ error: 'Erreur lors de l\'upload du PDF' });
    }

    const updatedRecord = await uploadResponse.json();

    return res.status(200).json({
      success: true,
      pdfUrl: updatedRecord.fields['PDF Devis']?.[0]?.url,
      message: 'PDF généré et uploadé avec succès'
    });

  } catch (error) {
    console.error('Erreur génération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}