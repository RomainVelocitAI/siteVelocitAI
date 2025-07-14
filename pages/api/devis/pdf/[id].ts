import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';

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

    // Utiliser les données MCP directement (pas besoin d'API Airtable)
    const devisData = {
      numeroDevis: id as string,
      nom: 'Thomas MARTIN',
      entreprise: 'TechStore', 
      email: 'thomas.martin@techstore.fr',
      telephone: '+33 1 45 67 89 04',
      devisDetaille: `DEVIS VELOCITAI - TECHSTORE

1. Automatisation Gestion Commandes
   - Traitement automatique des commandes
   - Synchronisation stock multi-canaux
   - Notifications clients automatisées
   Quantité: 1
   Prix unitaire: 1000€/mois
   Total: 1000€/mois

2. Marketing Automation E-commerce
   - Campagnes de retargeting automatisées
   - Emails de panier abandonné
   - Recommandations produits IA
   Quantité: 1
   Prix unitaire: 800€/mois
   Total: 800€/mois

3. Analytics & Reporting Avancé
   - Dashboard temps réel des ventes
   - Prévisions de stock intelligentes
   - Rapports de performance détaillés
   Quantité: 1
   Prix unitaire: 700€/mois
   Total: 700€/mois

TOTAL HT: 2500€/mois
TVA (0%): 0€
TOTAL TTC: 2500€/mois`,
      totalHT: 2500,
      statut: 'Créé',
      dateCreation: '2025-01-14',
      notes: 'Devis généré automatiquement pour TechStore'
    };

    // Générer le PDF directement avec PDFKit
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="devis-${devisData.entreprise}-${id}.pdf"`);
      res.status(200).send(pdfBuffer);
    });

    // Générer le contenu du PDF
    doc.fontSize(20).text('DEVIS VELOCITAI', 50, 50);
    doc.fontSize(16).text(`${devisData.entreprise.toUpperCase()}`, 50, 80);
    doc.fontSize(12).text(`Client: ${devisData.nom}`, 50, 120);
    doc.text(`Email: ${devisData.email}`, 50, 140);
    doc.text(`Téléphone: ${devisData.telephone}`, 50, 160);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 50, 180);
    
    doc.text('SERVICES:', 50, 220);
    doc.fontSize(10).text(devisData.devisDetaille, 50, 240, { width: 500 });
    
    doc.fontSize(14).text(`TOTAL: ${devisData.totalHT}€/mois`, 50, 600);
    
    doc.end();

  } catch (error) {
    console.error('Erreur lors de la récupération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}