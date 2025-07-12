#!/usr/bin/env node

/**
 * Création d'une campagne Google Ads de test
 * Script pour tester la création de campagnes via l'API
 */

const { GoogleAdsApi } = require('google-ads-api');
require('dotenv').config({ path: './config/.env' });

class GoogleAdsCampaignCreator {
  constructor() {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    });

    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
    this.customer = this.client.Customer({
      customer_id: this.customerId,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
    });
  }

  /**
   * Crée un budget pour la campagne
   */
  async createCampaignBudget(name, amountMicros = 1000000) { // 10€ par défaut
    try {
      console.log(`💰 Création du budget "${name}"...`);
      
      const budgetOperation = {
        create: {
          name: name,
          amount_micros: amountMicros,
          delivery_method: 'STANDARD',
          explicitly_shared: false
        }
      };

      const response = await this.customer.campaignBudgets.mutate([budgetOperation]);
      const budgetResourceName = response.results[0].resource_name;
      
      console.log(`✅ Budget créé : ${budgetResourceName}`);
      return budgetResourceName;
      
    } catch (error) {
      console.error('❌ Erreur création budget :', error.message);
      throw error;
    }
  }

  /**
   * Crée une campagne Search
   */
  async createSearchCampaign(config) {
    try {
      const {
        name = 'Test Campagne VelocitAI',
        budgetResourceName,
        targetCpa = 500000, // 5€
        startDate,
        endDate
      } = config;

      console.log(`📢 Création de la campagne "${name}"...`);

      const campaignOperation = {
        create: {
          name: name,
          advertising_channel_type: 'SEARCH',
          status: 'PAUSED', // Créer en pause pour éviter les dépenses accidentelles
          campaign_budget: budgetResourceName,
          network_settings: {
            target_google_search: true,
            target_search_network: true,
            target_content_network: false,
            target_partner_search_network: false
          },
          bidding_strategy_type: 'TARGET_CPA',
          target_cpa: {
            target_cpa_micros: targetCpa
          },
          start_date: startDate || this.getTodayString(),
          end_date: endDate || this.getFutureDate(30) // 30 jours par défaut
        }
      };

      const response = await this.customer.campaigns.mutate([campaignOperation]);
      const campaignResourceName = response.results[0].resource_name;
      
      console.log(`✅ Campagne créée : ${campaignResourceName}`);
      return campaignResourceName;
      
    } catch (error) {
      console.error('❌ Erreur création campagne :', error.message);
      throw error;
    }
  }

  /**
   * Crée un groupe d'annonces
   */
  async createAdGroup(campaignResourceName, config) {
    try {
      const {
        name = 'Groupe d\'annonces Test',
        cpcBidMicros = 100000 // 1€
      } = config;

      console.log(`📁 Création du groupe d'annonces "${name}"...`);

      const adGroupOperation = {
        create: {
          name: name,
          campaign: campaignResourceName,
          status: 'ENABLED',
          type: 'SEARCH_STANDARD',
          cpc_bid_micros: cpcBidMicros
        }
      };

      const response = await this.customer.adGroups.mutate([adGroupOperation]);
      const adGroupResourceName = response.results[0].resource_name;
      
      console.log(`✅ Groupe d'annonces créé : ${adGroupResourceName}`);
      return adGroupResourceName;
      
    } catch (error) {
      console.error('❌ Erreur création groupe d\'annonces :', error.message);
      throw error;
    }
  }

  /**
   * Ajoute des mots-clés au groupe d'annonces
   */
  async addKeywords(adGroupResourceName, keywords) {
    try {
      console.log(`🔑 Ajout de ${keywords.length} mot(s)-clé(s)...`);

      const keywordOperations = keywords.map(keyword => ({
        create: {
          ad_group: adGroupResourceName,
          status: 'ENABLED',
          keyword: {
            text: keyword.text,
            match_type: keyword.matchType || 'BROAD'
          },
          cpc_bid_micros: keyword.bidMicros || 50000 // 0.5€ par défaut
        }
      }));

      const response = await this.customer.adGroupCriteria.mutate(keywordOperations);
      
      console.log(`✅ ${response.results.length} mot(s)-clé(s) ajouté(s)`);
      
      response.results.forEach((result, index) => {
        console.log(`   🔸 "${keywords[index].text}" : ${result.resource_name}`);
      });
      
      return response.results;
      
    } catch (error) {
      console.error('❌ Erreur ajout mots-clés :', error.message);
      throw error;
    }
  }

  /**
   * Crée une annonce texte responsive
   */
  async createResponsiveSearchAd(adGroupResourceName, adConfig) {
    try {
      const {
        headlines = [
          'Automatisation Business La Réunion',
          'VelocitAI Expert Automatisation',
          'Gagnez du Temps avec l\'IA'
        ],
        descriptions = [
          'Automatisez vos processus métier avec notre expertise locale',
          'ROI garanti en 3-6 mois. Consultation gratuite.'
        ],
        finalUrl = 'https://velocit-ai.fr'
      } = adConfig;

      console.log('📝 Création de l\'annonce responsive...');

      const adOperation = {
        create: {
          ad_group: adGroupResourceName,
          status: 'ENABLED',
          ad: {
            type: 'RESPONSIVE_SEARCH_AD',
            responsive_search_ad: {
              headlines: headlines.map(text => ({ text })),
              descriptions: descriptions.map(text => ({ text })),
              path1: 'automatisation',
              path2: 'reunion'
            },
            final_urls: [finalUrl]
          }
        }
      };

      const response = await this.customer.adGroupAds.mutate([adOperation]);
      const adResourceName = response.results[0].resource_name;
      
      console.log(`✅ Annonce créée : ${adResourceName}`);
      console.log(`   📝 ${headlines.length} titres, ${descriptions.length} descriptions`);
      
      return adResourceName;
      
    } catch (error) {
      console.error('❌ Erreur création annonce :', error.message);
      throw error;
    }
  }

  /**
   * Utilitaires pour les dates
   */
  getTodayString() {
    return new Date().toISOString().slice(0, 10).replace(/-/g, '');
  }

  getFutureDate(days) {
    const future = new Date();
    future.setDate(future.getDate() + days);
    return future.toISOString().slice(0, 10).replace(/-/g, '');
  }

  /**
   * Crée une campagne complète de test
   */
  async createTestCampaign() {
    try {
      console.log('🚀 Création d\'une campagne complète de test...\n');

      // Configuration de la campagne
      const campaignConfig = {
        name: `Test VelocitAI - ${new Date().toLocaleDateString('fr-FR')}`,
        budgetName: `Budget Test - ${Date.now()}`,
        budgetAmount: 2000000, // 20€
        keywords: [
          { text: 'automatisation business réunion', matchType: 'PHRASE' },
          { text: 'consultant automatisation', matchType: 'BROAD' },
          { text: 'logiciel automation pme', matchType: 'BROAD' }
        ],
        adConfig: {
          headlines: [
            'Automatisation Business La Réunion',
            'Expert VelocitAI - ROI Garanti',
            'Consultation Gratuite Automation'
          ],
          descriptions: [
            'Spécialiste automation business à La Réunion. ROI en 3-6 mois.',
            'Gagnez 70% de temps sur vos tâches. Consultation gratuite.'
          ]
        }
      };

      // 1. Créer le budget
      const budgetResourceName = await this.createCampaignBudget(
        campaignConfig.budgetName,
        campaignConfig.budgetAmount
      );

      // 2. Créer la campagne
      const campaignResourceName = await this.createSearchCampaign({
        name: campaignConfig.name,
        budgetResourceName
      });

      // 3. Créer le groupe d'annonces
      const adGroupResourceName = await this.createAdGroup(campaignResourceName, {
        name: 'Automation Services'
      });

      // 4. Ajouter les mots-clés
      await this.addKeywords(adGroupResourceName, campaignConfig.keywords);

      // 5. Créer l'annonce
      await this.createResponsiveSearchAd(adGroupResourceName, campaignConfig.adConfig);

      console.log('\n🎉 Campagne de test créée avec succès !');
      console.log('📊 Résumé :');
      console.log(`   📢 Campagne : ${campaignConfig.name}`);
      console.log(`   💰 Budget : ${campaignConfig.budgetAmount / 1000000}€`);
      console.log(`   🔑 Mots-clés : ${campaignConfig.keywords.length}`);
      console.log(`   📝 1 annonce responsive`);
      console.log('⚠️  Statut : PAUSE (activez manuellement dans Google Ads)');

      return {
        campaign: campaignResourceName,
        adGroup: adGroupResourceName,
        budget: budgetResourceName
      };

    } catch (error) {
      console.error('💥 Erreur création campagne complète :', error.message);
      throw error;
    }
  }
}

// Exécution du script
if (require.main === module) {
  const creator = new GoogleAdsCampaignCreator();
  creator.createTestCampaign().catch(console.error);
}

module.exports = GoogleAdsCampaignCreator;