import { NextApiRequest, NextApiResponse } from 'next';

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

    // TODO: Récupérer les données du devis depuis Airtable
    // Pour l'instant, simulation avec données factices pour le test
    
    if (id === 'VEL-20250714-613') {
      const pdfContent = `
DEVIS VEL-20250714-613
============================

Client: Romain Cano
Email: romain.cano@exemple.fr

Services:
- Site web automatisé avec blog (1x4500€) = 4500€
- Abonnement maintenance mensuel (1x300€) = 300€

Total HT: 4800€
TVA (8.5%): 408€
Total TTC: 5208€

Créé le: 14/01/2025

Notes: Site web avec système de blog automatisé + abonnement maintenance 300€/mois

VelocitAI - contact@velocit-ai.fr
      `;

      // Pour l'instant, retourner un fichier texte
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="devis-${id}.txt"`);
      res.status(200).send(pdfContent);
    } else {
      return res.status(404).json({ error: 'Devis introuvable' });
    }

  } catch (error) {
    console.error('Erreur lors de la génération PDF:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}