import { NextApiRequest, NextApiResponse } from 'next';
import { createQuoteData, generateQuoteUrl, QuoteData } from '@/lib/quoteEncryption';
import { createQuoteInAirtable, AirtableQuoteData } from '@/lib/airtable';

interface GenerateQuoteRequest {
  clientName: string;
  clientCompany?: string;
  clientEmail: string;
  services: Array<{
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    category: string;
  }>;
  customizations?: string;
  validityDays?: number;
}

interface QuoteGenerationResponse {
  success: boolean;
  quoteData?: QuoteData;
  quoteUrl?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteGenerationResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const {
      clientName,
      clientCompany,
      clientEmail,
      services,
      customizations,
      validityDays = 30
    }: GenerateQuoteRequest = req.body;

    // Validation des données
    if (!clientName || !clientEmail || !services || services.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Données manquantes: nom client, email et services requis'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Format email invalide'
      });
    }

    // Validation des services
    for (const service of services) {
      if (!service.name || !service.description || !service.category) {
        return res.status(400).json({
          success: false,
          error: 'Chaque service doit avoir un nom, description et catégorie'
        });
      }
      if (service.quantity <= 0 || service.unitPrice <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Quantité et prix unitaire doivent être positifs'
        });
      }
    }

    // Créer les données du devis
    const quoteData = createQuoteData({
      clientName,
      clientCompany,
      clientEmail,
      services,
      customizations,
      validityDays
    });

    // Générer l'URL du devis
    const quoteUrl = generateQuoteUrl(quoteData);

    // TODO: Mettre à jour Airtable avec les données du devis
    // Cette partie sera implémentée dans la prochaine étape
    
    console.log('Devis généré:', {
      quoteNumber: quoteData.quoteNumber,
      client: quoteData.client.name,
      total: quoteData.totals.totalTTC,
      url: quoteUrl
    });

    return res.status(200).json({
      success: true,
      quoteData,
      quoteUrl
    });

  } catch (error) {
    console.error('Erreur lors de la génération du devis:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
}