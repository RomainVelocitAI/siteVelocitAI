#!/usr/bin/env node

/**
 * Configuration OAuth 2.0 pour Google Ads API
 * Ce script guide l'utilisateur pour obtenir le refresh token
 */

const { OAuth2Client } = require('google-auth-library');
const readline = require('readline');
require('dotenv').config({ path: './config/.env' });

class GoogleAdsOAuthSetup {
  constructor() {
    this.clientId = process.env.GOOGLE_ADS_CLIENT_ID;
    this.clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
    
    if (!this.clientId || !this.clientSecret) {
      console.error('❌ CLIENT_ID et CLIENT_SECRET requis dans .env');
      process.exit(1);
    }

    this.oauth2Client = new OAuth2Client(
      this.clientId,
      this.clientSecret,
      'urn:ietf:wg:oauth:2.0:oob' // Pour applications desktop
    );

    this.scopes = ['https://www.googleapis.com/auth/adwords'];
  }

  /**
   * Étape 1 : Générer l'URL d'autorisation
   */
  generateAuthUrl() {
    console.log('🔐 Configuration OAuth Google Ads API\n');
    
    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      prompt: 'consent' // Force le consentement pour obtenir refresh token
    });

    console.log('📋 Étapes à suivre :');
    console.log('1. Ouvrez cette URL dans votre navigateur :');
    console.log(`\n${authUrl}\n`);
    console.log('2. Connectez-vous avec le compte Google Ads');
    console.log('3. Acceptez les permissions');
    console.log('4. Copiez le code d\'autorisation affiché');
    console.log('5. Collez-le ci-dessous\n');
    
    return authUrl;
  }

  /**
   * Étape 2 : Échanger le code contre les tokens
   */
  async getTokenFromCode(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      
      console.log('✅ Tokens obtenus avec succès !');
      console.log('\n📝 Ajoutez ces informations à votre fichier .env :');
      console.log(`GOOGLE_ADS_REFRESH_TOKEN="${tokens.refresh_token}"`);
      
      if (tokens.access_token) {
        console.log('\n🔍 Token d\'accès (temporaire) :');
        console.log(`Access Token: ${tokens.access_token.substring(0, 20)}...`);
      }

      // Sauvegarder dans un fichier temporaire
      const fs = require('fs');
      const tokenData = {
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        created_at: new Date().toISOString()
      };

      fs.writeFileSync('./config/tokens.json', JSON.stringify(tokenData, null, 2));
      console.log('\n💾 Tokens sauvegardés dans config/tokens.json');
      
      return tokens;
    } catch (error) {
      console.error('❌ Erreur lors de l\'échange du code :', error.message);
      throw error;
    }
  }

  /**
   * Interface utilisateur pour saisir le code
   */
  async promptForCode() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('🔑 Collez le code d\'autorisation ici : ', (code) => {
        rl.close();
        resolve(code.trim());
      });
    });
  }

  /**
   * Processus complet de configuration
   */
  async setup() {
    try {
      console.log('🚀 Démarrage de la configuration OAuth...\n');
      
      // Vérifier si on a déjà un refresh token
      if (process.env.GOOGLE_ADS_REFRESH_TOKEN) {
        console.log('✅ Refresh token déjà configuré dans .env');
        console.log('🔄 Pour reconfigurer, supprimez GOOGLE_ADS_REFRESH_TOKEN du .env\n');
        return;
      }

      // Générer l'URL d'autorisation
      this.generateAuthUrl();
      
      // Demander le code à l'utilisateur
      const code = await this.promptForCode();
      
      if (!code) {
        console.error('❌ Code d\'autorisation requis');
        return;
      }

      // Échanger le code contre les tokens
      await this.getTokenFromCode(code);
      
      console.log('\n🎉 Configuration OAuth terminée !');
      console.log('📋 Prochaines étapes :');
      console.log('1. Copiez le REFRESH_TOKEN dans votre .env');
      console.log('2. Testez la connexion : npm run test-connection');
      
    } catch (error) {
      console.error('❌ Erreur lors de la configuration :', error.message);
      process.exit(1);
    }
  }
}

// Exécution du script
if (require.main === module) {
  const setup = new GoogleAdsOAuthSetup();
  setup.setup();
}

module.exports = GoogleAdsOAuthSetup;