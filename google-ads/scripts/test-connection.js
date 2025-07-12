#!/usr/bin/env node

/**
 * Test de connexion à l'API Google Ads
 * Vérifie que tous les identifiants sont corrects
 */

const { GoogleAdsApi } = require('google-ads-api');
require('dotenv').config({ path: './config/.env' });

class GoogleAdsConnectionTest {
  constructor() {
    this.client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    });

    this.customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
    
    if (!this.customerId) {
      console.error('❌ GOOGLE_ADS_CUSTOMER_ID requis dans .env');
      process.exit(1);
    }
  }

  /**
   * Test de base : récupérer les informations du compte
   */
  async testBasicConnection() {
    try {
      console.log('🔍 Test de connexion basique...');
      
      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      });

      // Requête simple pour tester la connexion
      const query = `
        SELECT 
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone,
          customer.status
        FROM customer 
        WHERE customer.id = ${this.customerId}
      `;

      const [result] = await customer.query(query);
      
      console.log('✅ Connexion réussie !');
      console.log(`📊 Compte : ${result.customer.descriptive_name}`);
      console.log(`🆔 ID : ${result.customer.id}`);
      console.log(`💰 Devise : ${result.customer.currency_code}`);
      console.log(`🌍 Fuseau : ${result.customer.time_zone}`);
      console.log(`📈 Statut : ${result.customer.status}`);
      
      return result;
    } catch (error) {
      console.error('❌ Erreur de connexion :', error.message);
      
      if (error.message.includes('UNAUTHENTICATED')) {
        console.log('💡 Vérifiez votre refresh_token');
      } else if (error.message.includes('INVALID_CUSTOMER_ID')) {
        console.log('💡 Vérifiez votre customer_id');
      } else if (error.message.includes('DEVELOPER_TOKEN_NOT_APPROVED')) {
        console.log('💡 Votre developer token doit être approuvé');
      }
      
      throw error;
    }
  }

  /**
   * Test avancé : lister les campagnes existantes
   */
  async testCampaignsList() {
    try {
      console.log('\n🔍 Test de récupération des campagnes...');
      
      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      });

      const query = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          campaign.advertising_channel_type,
          campaign_budget.amount_micros
        FROM campaign 
        ORDER BY campaign.name
        LIMIT 10
      `;

      const campaigns = await customer.query(query);
      
      console.log(`✅ ${campaigns.length} campagne(s) trouvée(s) :`);
      
      campaigns.forEach((campaign, index) => {
        const budget = campaign.campaign_budget.amount_micros / 1000000;
        console.log(`${index + 1}. ${campaign.campaign.name}`);
        console.log(`   📊 Statut: ${campaign.campaign.status}`);
        console.log(`   💰 Budget: ${budget}€`);
        console.log(`   📺 Type: ${campaign.campaign.advertising_channel_type}`);
      });
      
      return campaigns;
    } catch (error) {
      console.error('❌ Erreur récupération campagnes :', error.message);
      throw error;
    }
  }

  /**
   * Test des quotas et limites
   */
  async testQuotas() {
    try {
      console.log('\n🔍 Test des quotas API...');
      
      const customer = this.client.Customer({
        customer_id: this.customerId,
        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
      });

      // Requête légère pour tester les quotas
      const query = `
        SELECT customer.id 
        FROM customer 
        WHERE customer.id = ${this.customerId}
      `;

      const start = Date.now();
      await customer.query(query);
      const duration = Date.now() - start;
      
      console.log(`✅ Requête exécutée en ${duration}ms`);
      console.log('📊 Quotas : OK (pas d\'erreur de limite)');
      
    } catch (error) {
      if (error.message.includes('QUOTA_ERROR')) {
        console.error('❌ Quota API dépassé');
      } else {
        console.error('❌ Erreur test quotas :', error.message);
      }
      throw error;
    }
  }

  /**
   * Exécution complète des tests
   */
  async runAllTests() {
    try {
      console.log('🚀 Tests de connexion Google Ads API\n');
      
      // Vérification des variables d'environnement
      console.log('🔍 Vérification de la configuration...');
      const requiredVars = [
        'GOOGLE_ADS_CLIENT_ID',
        'GOOGLE_ADS_CLIENT_SECRET', 
        'GOOGLE_ADS_DEVELOPER_TOKEN',
        'GOOGLE_ADS_REFRESH_TOKEN',
        'GOOGLE_ADS_CUSTOMER_ID'
      ];

      const missing = requiredVars.filter(v => !process.env[v]);
      if (missing.length > 0) {
        console.error(`❌ Variables manquantes : ${missing.join(', ')}`);
        process.exit(1);
      }
      
      console.log('✅ Configuration complète\n');
      
      // Exécuter les tests
      await this.testBasicConnection();
      await this.testCampaignsList();
      await this.testQuotas();
      
      console.log('\n🎉 Tous les tests passent !');
      console.log('🚀 Vous pouvez maintenant créer des campagnes');
      
    } catch (error) {
      console.error('\n💥 Échec des tests :', error.message);
      console.log('\n🔧 Vérifiez votre configuration dans .env');
      process.exit(1);
    }
  }
}

// Exécution du script
if (require.main === module) {
  const test = new GoogleAdsConnectionTest();
  test.runAllTests();
}

module.exports = GoogleAdsConnectionTest;