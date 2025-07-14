import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

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
    
    // Générer le HTML pour le PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Devis ${entreprise}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; line-height: 1.6; }
    .header { text-align: center; border-bottom: 3px solid #7C3AED; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #7C3AED; margin-bottom: 10px; }
    .subtitle { color: #666; font-size: 14px; }
    .client-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .client-info h3 { margin-top: 0; color: #7C3AED; }
    .services { margin-bottom: 30px; }
    .service-content { white-space: pre-line; background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
    .totals { background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .total-line { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .total-final { font-weight: bold; font-size: 18px; color: #7C3AED; border-top: 2px solid #7C3AED; padding-top: 10px; margin-top: 10px; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
    .validity { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center; font-weight: bold; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
    .status-cree { background: #dbeafe; color: #1e40af; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">VelocitAI</div>
    <div class="subtitle">Automatisation d'entreprise • Le Tampon, La Réunion</div>
    <div style="margin-top: 15px;">
      <span class="status status-cree">${fields['Statut'] || 'Créé'}</span>
    </div>
  </div>

  <div class="client-info">
    <h3>Informations Client</h3>
    <p><strong>Nom:</strong> ${fields['Nom Prénom'] || ''}</p>
    <p><strong>Entreprise:</strong> ${entreprise}</p>
    <p><strong>Email:</strong> ${fields['Email'] || ''}</p>
    <p><strong>Téléphone:</strong> ${fields['Téléphone'] || 'Non renseigné'}</p>
    <p><strong>Date de création:</strong> ${new Date(dateCreation).toLocaleDateString('fr-FR')}</p>
    <p><strong>Numéro de devis:</strong> ${id}</p>
  </div>

  <div class="services">
    <h3 style="color: #7C3AED;">Détails du devis</h3>
    <div class="service-content">${fields['Devis Détaillé'] || ''}</div>
  </div>

  <div class="validity">
    Validité du devis: 30 jours à compter de la date de création
  </div>

  <div class="totals">
    <div class="total-line">
      <span>Total HT:</span>
      <span>${totalHT.toLocaleString('fr-FR')}€${isMonthly ? '/mois' : ''}</span>
    </div>
    <div class="total-line">
      <span>TVA (0%):</span>
      <span>0€</span>
    </div>
    <div class="total-line total-final">
      <span>Total TTC:</span>
      <span>${totalHT.toLocaleString('fr-FR')}€${isMonthly ? '/mois' : ''}</span>
    </div>
  </div>

  ${fields['Notes'] ? `
  <div style="margin-top: 30px; padding: 15px; background: #f9fafb; border-radius: 6px;">
    <h4 style="margin-top: 0; color: #374151;">Notes:</h4>
    <p style="margin-bottom: 0;">${fields['Notes']}</p>
  </div>
  ` : ''}

  <div class="footer">
    <p><strong>VelocitAI</strong> - Automatisation d'entreprise</p>
    <p>📍 Le Tampon, La Réunion • 📧 contact@velocit-ai.fr • 🌐 velocit-ai.fr</p>
    <p>Devis généré automatiquement • Mentions légales disponibles sur velocit-ai.fr</p>
  </div>
</body>
</html>`;

    // Générer le PDF avec Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();

    // Retourner le PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="devis-${entreprise}-${id}.pdf"`);
    res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error('Erreur lors de la génération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}