import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  DocumentArrowDownIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  BuildingOfficeIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface QuoteData {
  id: string;
  numeroDevis: string;
  client: {
    nom: string;
    entreprise?: string | null;
    email: string;
    telephone?: string | null;
  };
  services: Array<{
    nom: string;
    description: string;
    quantite: number;
    prixUnitaire: number;
    total: number;
  }>;
  totaux: {
    totalHT: number;
    tva: number;
    totalTTC: number;
    tauxTVA: number;
  };
  statut: string;
  dateCreation: string;
  notes?: string;
  stripePaymentLink?: string;
  urlPdf?: string;
}

interface QuotePageProps {
  quoteData: QuoteData | null;
  error?: string;
}

export default function QuotePage({ quoteData, error }: QuotePageProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  if (error || !quoteData) {
    return (
      <>
        <Head>
          <title>Devis introuvable - VelocitAI</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <XCircleIcon className="mx-auto h-12 w-12 text-red-400" />
            <h1 className="mt-4 text-lg font-medium text-gray-900">Devis introuvable</h1>
            <p className="mt-2 text-sm text-gray-500">
              {error || 'Ce devis n\'existe pas ou a été supprimé.'}
            </p>
            <a 
              href="https://velocit-ai.fr"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Retour au site
            </a>
          </div>
        </div>
      </>
    );
  }

  const handleAcceptQuote = async () => {
    setIsAccepting(true);
    
    try {
      // Appel à l'API interne
      const response = await fetch('/api/devis/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          devisId: quoteData.id,
          numeroDevis: quoteData.numeroDevis 
        }),
      });
      
      if (response.ok) {
        // Appel au webhook n8n
        await fetch('https://n8n.srv765302.hstgr.cloud/webhook/7a82ee39-d91e-40eb-b2d4-272a7d2f2a52', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            devisId: quoteData.id,
            numeroDevis: quoteData.numeroDevis,
            client: quoteData.client,
            totalHT: quoteData.totaux.totalHT,
            statut: 'Accepté',
            dateAcceptation: new Date().toISOString()
          }),
        });
        
        setHasAccepted(true);
      } else {
        alert('Erreur lors de l\'acceptation du devis. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'acceptation du devis. Veuillez réessayer.');
    } finally {
      setIsAccepting(false);
    }
  };

  const getStatusBadge = () => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      'Créé': { label: 'Créé', color: 'bg-blue-100 text-blue-800' },
      'Envoyé': { label: 'Envoyé', color: 'bg-yellow-100 text-yellow-800' },
      'Accepté': { label: 'Accepté', color: 'bg-green-100 text-green-800' },
      'Refusé': { label: 'Refusé', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[quoteData.statut] || { label: quoteData.statut, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour ! Je viens de consulter mon devis VelocitAI nÂ°${quoteData.numeroDevis}. J'aimerais en discuter avec vous.`
  );

  const whatsappUrl = `https://wa.me/262692470141?text=${whatsappMessage}`;

  return (
    <>
      <Head>
        <title>Devis {quoteData.numeroDevis} - VelocitAI</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={`Devis personnalisÃ© VelocitAI pour ${quoteData.client.nom}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    VelocitAI
                  </h1>
                </div>
                <div className="hidden sm:block h-6 w-px bg-gray-300" />
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-500">Devis Personnalisé</p>
                </div>
              </div>
              {getStatusBadge()}
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success message si acceptÃ© */}
          {hasAccepted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-md bg-green-50 p-4 border border-green-200"
            >
              <div className="flex">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Devis accepté avec succès !
                  </h3>
                  <p className="mt-1 text-sm text-green-700">
                    Merci pour votre confiance. Nous vous contacterons dans les 24h pour la suite.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations principales */}
            <div className="lg:col-span-2 space-y-6">
              {/* En-tÃªte devis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">
                    Devis #{quoteData.numeroDevis}
                  </h2>
                  <p className="text-purple-100 text-sm">
                    Créé le {new Date(quoteData.dateCreation).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Client</h3>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{quoteData.client.nom}</p>
                        {quoteData.client.entreprise && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                            {quoteData.client.entreprise}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          {quoteData.client.email}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Informations</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          Statut: {quoteData.statut}
                        </p>
                        <p className="text-sm text-gray-600">
                          {quoteData.services.length} service{quoteData.services.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {quoteData.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Notes</h4>
                      <p className="text-sm text-blue-800">{quoteData.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Services inclus</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {quoteData.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{service.nom}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Quantité: {service.quantite}</span>
                            <span>Prix unitaire: {service.prixUnitaire.toLocaleString('fr-FR')}€</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-semibold text-gray-900">
                            {service.total.toLocaleString('fr-FR')}€
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar avec totaux et actions */}
            <div className="space-y-6">
              {/* RÃ©capitulatif financier */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Récapitulatif</h3>
                </div>
                
                <div className="px-6 py-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sous-total HT</span>
                    <span className="font-medium text-gray-900">{quoteData.totaux.totalHT.toLocaleString('fr-FR')}€{quoteData.services.some(s => s.nom.includes('/mois') || s.description.includes('/mois')) ? '/mois' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">TVA ({quoteData.totaux.tauxTVA}%)</span>
                    <span className="font-medium text-gray-900">{quoteData.totaux.tva.toLocaleString('fr-FR')}€</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total TTC</span>
                      <span className="text-xl font-bold text-purple-600">
                        {quoteData.totaux.totalTTC.toLocaleString('fr-FR')}€{quoteData.services.some(s => s.nom.includes('/mois') || s.description.includes('/mois')) ? '/mois' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Actions</h3>
                </div>
                
                <div className="px-6 py-4 space-y-3">
                  {!hasAccepted && quoteData.statut !== 'Accepté' && (
                    <button
                      onClick={handleAcceptQuote}
                      disabled={isAccepting}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      {isAccepting ? 'Acceptation...' : 'Accepter le devis'}
                    </button>
                  )}
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                    Discuter sur WhatsApp
                  </a>
                  
                  {quoteData.stripePaymentLink && (
                    <a
                      href={quoteData.stripePaymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                      </svg>
                      Payer avec Stripe
                    </a>
                  )}
                  
                  <a
                    href={quoteData.urlPdf || `/api/devis/pdf/${quoteData.numeroDevis}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </a>
                </div>
              </motion.div>

              {/* Informations VelocitAI */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6"
              >
                <h3 className="text-sm font-medium text-gray-900 mb-3">VelocitAI</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>🚀 Automatisation d'entreprise</p>
                  <p>📍 Le Tampon, La Réunion</p>
                  <p>📧 contact@velocit-ai.fr</p>
                  <p>🌐 velocit-ai.fr</p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-xs text-gray-500">
              <p>
                Devis généré automatiquement par VelocitAI • 
                <a href="https://velocit-ai.fr" className="text-purple-600 hover:text-purple-500 ml-1">
                  Mentions légales
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  
  if (typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    // Configuration Airtable
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = 'appRCCSf1bIo1iois';
    const AIRTABLE_TABLE_ID = 'tblVufTcqkATBP3vm';

    if (!AIRTABLE_API_KEY) {
      console.error('AIRTABLE_API_KEY non configurÃ©e');
      return {
        props: {
          quoteData: null,
          error: 'Configuration manquante'
        }
      };
    }

    // Rcuprer le devis directement par son ID
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
      console.error('Erreur API Airtable:', response.status, await response.text());
      return {
        props: {
          quoteData: null,
          error: 'Devis introuvable'
        }
      };
    }

    const record = await response.json();
    const fields = record.fields;

    // Parser le devis détaillé pour extraire les services
    const devisText = fields['Devis Détaillé'] || '';
    const services = parseDevisDetails(devisText);
    
    // Extraire le lien de paiement Stripe s'il existe
    const stripePaymentLink = extractStripePaymentLink(devisText);

    // Pas de TVA pour les devis
    const totalHT = fields['Total HT'] || 0;
    const tauxTVA = 0;
    const tva = 0;
    const totalTTC = totalHT;

    const quoteData: QuoteData = {
      id: record.id,
      numeroDevis: extractNumeroDevis(fields['URL Devis'] || id),
      client: {
        nom: fields['Nom Prénom'] || '',
        entreprise: fields['Entreprise'] || null,
        email: fields['Email'] || '',
        telephone: fields['Téléphone'] || null
      },
      urlPdf: fields['URL PDF'] || null,
      services,
      totaux: {
        totalHT,
        tva,
        totalTTC,
        tauxTVA
      },
      statut: fields['Statut'] || 'Créé',
      dateCreation: fields['Date Création'] || new Date().toISOString().split('T')[0],
      notes: fields['Notes'],
      stripePaymentLink
    };

    return {
      props: {
        quoteData
      }
    };

  } catch (error) {
    console.error('Erreur lors de la rÃ©cupÃ©ration du devis:', error);
    return {
      props: {
        quoteData: null,
        error: 'Erreur lors de la rÃ©cupÃ©ration du devis'
      }
    };
  }
};

// Fonction pour parser les détails du devis depuis le texte
function parseDevisDetails(devisText: string) {
  const services = [];
  const lines = devisText.split('\n');
  
  let currentService = null;
  let collectingDescription = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Détecter un nouveau service (format: "1. Nom du service")
    const serviceMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);
    if (serviceMatch) {
      // Sauvegarder le service précédent s'il existe
      if (currentService) {
        services.push(currentService);
      }
      
      const [, , serviceName] = serviceMatch;
      currentService = {
        nom: serviceName.trim(),
        description: '',
        quantite: 1,
        prixUnitaire: 0,
        total: 0
      };
      collectingDescription = true;
      continue;
    }
    
    // Détecter les prix unitaires (format: "Prix unitaire: 12 000€")
    const prixMatch = trimmedLine.match(/Prix unitaire:\s*(\d+(?:\s?\d{3})*(?:,\d{2})?)€?/);
    if (prixMatch && currentService) {
      const prix = parseFloat(prixMatch[1].replace(/\s/g, '').replace(',', '.'));
      currentService.prixUnitaire = prix;
      continue;
    }
    
    // Détecter les totaux (format: "Total: 12 000€")
    const totalMatch = trimmedLine.match(/Total:\s*(\d+(?:\s?\d{3})*(?:,\d{2})?)€?/);
    if (totalMatch && currentService) {
      const total = parseFloat(totalMatch[1].replace(/\s/g, '').replace(',', '.'));
      currentService.total = total;
      continue;
    }
    
    // Détecter les quantités (format: "Quantité: 1 projet")
    const quantiteMatch = trimmedLine.match(/Quantité:\s*(\d+)/);
    if (quantiteMatch && currentService) {
      currentService.quantite = parseInt(quantiteMatch[1], 10);
      continue;
    }
    
    // Collecter la description (lignes avec tirets, même avec espaces avant)
    if (collectingDescription && currentService && (trimmedLine.startsWith('-') || line.trim().startsWith('-'))) {
      if (currentService.description) {
        currentService.description += '\n';
      }
      currentService.description += trimmedLine;
      continue;
    }
    
    // Arrêter la collecte de description si on arrive aux totaux
    if (trimmedLine.startsWith('TOTAL') || trimmedLine.startsWith('TVA')) {
      collectingDescription = false;
    }
  }
  
  // Ajouter le dernier service
  if (currentService) {
    services.push(currentService);
  }
  
  // Si aucun service parsé, créer un service générique
  if (services.length === 0) {
    services.push({
      nom: 'Prestation personnalisée',
      description: 'Service sur mesure selon vos besoins',
      quantite: 1,
      prixUnitaire: 0,
      total: 0
    });
  }
  
  return services;
}

// Fonction pour extraire le numÃ©ro de devis depuis l'URL
function extractNumeroDevis(url: string): string {
  const match = url.match(/\/devis\/(.+)$/);
  return match ? match[1] : url;
}

// Fonction pour extraire le lien de paiement Stripe depuis le texte
function extractStripePaymentLink(devisText: string): string | undefined {
  const stripeMatch = devisText.match(/🔗 LIEN DE PAIEMENT STRIPE[^:]*:\s*(https:\/\/buy\.stripe\.com\/[^\s\n]+)/);
  return stripeMatch ? stripeMatch[1] : undefined;
}