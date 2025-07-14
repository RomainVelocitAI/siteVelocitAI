import Airtable from 'airtable';

// Configuration Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_DEVIS_BASE_ID!);

export interface AirtableQuoteData {
  numeroDevis: string;
  clientNom: string;
  clientEntreprise?: string;
  clientEmail: string;
  clientTelephone?: string;
  servicesDetails: string;
  totalHT: number;
  totalTTC: number;
  tauxTVA: number;
  statut: string;
  dateCreation: string;
  dateValidite: string;
  notes?: string;
  urlDevis: string;
}

export async function createQuoteInAirtable(quoteData: AirtableQuoteData): Promise<string> {
  try {
    const record = await base('Devis Clients').create([
      {
        fields: {
          'Numéro Devis': quoteData.numeroDevis,
          'Client Nom': quoteData.clientNom,
          'Client Entreprise': quoteData.clientEntreprise || '',
          'Client Email': quoteData.clientEmail,
          'Client Téléphone': quoteData.clientTelephone || '',
          'Services Détails': quoteData.servicesDetails,
          'Total HT': quoteData.totalHT,
          'Total TTC': quoteData.totalTTC,
          'Taux TVA': quoteData.tauxTVA,
          'Statut': quoteData.statut,
          'Date Création': quoteData.dateCreation,
          'Date Validité': quoteData.dateValidite,
          'Notes': quoteData.notes || '',
          'URL Devis': quoteData.urlDevis
        }
      }
    ]);

    console.log('✅ Devis créé dans Airtable:', record[0].getId());
    return record[0].getId();
  } catch (error) {
    console.error('❌ Erreur lors de la création du devis dans Airtable:', error);
    throw new Error('Impossible de sauvegarder le devis dans Airtable');
  }
}

export async function getQuoteFromAirtable(recordId: string) {
  try {
    const record = await base('Devis Clients').find(recordId);
    return {
      id: record.getId(),
      fields: record.fields
    };
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du devis:', error);
    throw new Error('Devis introuvable');
  }
}

export async function updateQuoteStatus(recordId: string, newStatus: string) {
  try {
    const record = await base('Devis Clients').update([
      {
        id: recordId,
        fields: {
          'Statut': newStatus,
          'Date Modification': new Date().toISOString()
        }
      }
    ]);
    
    console.log('✅ Statut du devis mis à jour:', newStatus);
    return record[0];
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du statut:', error);
    throw new Error('Impossible de mettre à jour le statut');
  }
}