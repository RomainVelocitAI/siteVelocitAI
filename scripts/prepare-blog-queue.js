#!/usr/bin/env node

/**
 * Script pour préparer une file d'attente d'articles de blog
 * Permet de voir et gérer les articles en attente de publication
 */

const BlogAutomation = require('./auto-publish-blog');
const fetch = require('node-fetch');

class BlogQueueManager {
  constructor() {
    this.automation = new BlogAutomation();
  }

  /**
   * Affiche la file d'attente des articles
   */
  async showQueue() {
    try {
      console.log('📋 File d\'attente des articles de blog\n');

      // Récupérer tous les articles programmés
      const filterFormula = `AND(
        {Status} = 'Scheduled',
        {Published} = FALSE()
      )`;

      const url = `${this.automation.baseUrl}?filterByFormula=${encodeURIComponent(filterFormula)}&sort[0][field]=Created&sort[0][direction]=asc`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.automation.headers
      });

      if (!response.ok) {
        throw new Error(`Erreur Airtable: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const articles = data.records;

      if (articles.length === 0) {
        console.log('ℹ️  Aucun article en file d\'attente');
        return;
      }

      console.log(`📊 ${articles.length} article(s) en file d'attente:\n`);

      articles.forEach((record, index) => {
        const fields = record.fields;
        const position = index + 1;
        const nextPublication = this.calculateNextPublicationDate(index);
        
        console.log(`${position}. 📄 ${fields.Title}`);
        console.log(`   📅 Publication prévue: ${nextPublication}`);
        console.log(`   👤 Auteur: ${fields.Author || 'VelocitAI'}`);
        console.log(`   🏷️  Catégorie: ${fields.Category}`);
        console.log(`   ⏱️  Temps de lecture: ${fields['Read Time'] || 'À calculer'} min`);
        console.log(`   🔗 Slug: ${fields.Slug || 'À générer'}`);
        console.log('');
      });

      console.log(`🚀 Prochain article à publier: "${articles[0].fields.Title}"`);
      console.log(`📅 Sera publié lors de la prochaine exécution quotidienne\n`);

    } catch (error) {
      console.error('❌ Erreur lors de l\'affichage de la file:', error);
    }
  }

  /**
   * Calcule la date de publication prévue
   */
  calculateNextPublicationDate(queuePosition) {
    const today = new Date();
    const publicationDate = new Date(today);
    publicationDate.setDate(today.getDate() + queuePosition);
    
    return publicationDate.toISOString().split('T')[0];
  }

  /**
   * Simule la publication des prochains jours
   */
  async simulatePublications(days = 7) {
    try {
      console.log(`📅 Simulation des publications pour les ${days} prochains jours:\n`);

      const filterFormula = `AND(
        {Status} = 'Scheduled',
        {Published} = FALSE()
      )`;

      const url = `${this.automation.baseUrl}?filterByFormula=${encodeURIComponent(filterFormula)}&sort[0][field]=Created&sort[0][direction]=asc&maxRecords=${days}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.automation.headers
      });

      const data = await response.json();
      const articles = data.records;

      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
        
        console.log(`📅 ${dayName} ${dateStr}:`);
        
        if (articles[i]) {
          const article = articles[i].fields;
          console.log(`   ✅ "${article.Title}"`);
          console.log(`   📂 ${article.Category}`);
          console.log(`   ⏱️  ${article['Read Time'] || 'N/A'} min de lecture`);
        } else {
          console.log(`   ❌ Aucun article programmé`);
        }
        console.log('');
      }

    } catch (error) {
      console.error('❌ Erreur lors de la simulation:', error);
    }
  }

  /**
   * Statistiques de la file d'attente
   */
  async showStats() {
    try {
      console.log('📊 Statistiques de la file d\'attente\n');

      // Articles programmés
      const scheduledFormula = `AND({Status} = 'Scheduled', {Published} = FALSE())`;
      const scheduledUrl = `${this.automation.baseUrl}?filterByFormula=${encodeURIComponent(scheduledFormula)}`;
      
      // Articles publiés
      const publishedFormula = `AND({Status} = 'Published', {Published} = TRUE())`;
      const publishedUrl = `${this.automation.baseUrl}?filterByFormula=${encodeURIComponent(publishedFormula)}`;

      // Articles en brouillon
      const draftFormula = `{Status} = 'Draft'`;
      const draftUrl = `${this.automation.baseUrl}?filterByFormula=${encodeURIComponent(draftFormula)}`;

      const [scheduledRes, publishedRes, draftRes] = await Promise.all([
        fetch(scheduledUrl, { headers: this.automation.headers }),
        fetch(publishedUrl, { headers: this.automation.headers }),
        fetch(draftUrl, { headers: this.automation.headers })
      ]);

      const [scheduledData, publishedData, draftData] = await Promise.all([
        scheduledRes.json(),
        publishedRes.json(),
        draftRes.json()
      ]);

      console.log(`📝 Articles en brouillon: ${draftData.records.length}`);
      console.log(`⏳ Articles programmés: ${scheduledData.records.length}`);
      console.log(`✅ Articles publiés: ${publishedData.records.length}`);
      console.log(`📈 Total: ${draftData.records.length + scheduledData.records.length + publishedData.records.length}`);

      if (scheduledData.records.length > 0) {
        const daysOfContent = scheduledData.records.length;
        console.log(`\n🗓️  Vous avez du contenu pour ${daysOfContent} jour(s)`);
        
        const lastPublicationDate = new Date();
        lastPublicationDate.setDate(lastPublicationDate.getDate() + daysOfContent - 1);
        console.log(`📅 Dernière publication prévue: ${lastPublicationDate.toISOString().split('T')[0]}`);
      }

    } catch (error) {
      console.error('❌ Erreur lors du calcul des statistiques:', error);
    }
  }

  /**
   * Menu interactif
   */
  async showMenu() {
    console.log('🤖 Gestionnaire de file d\'attente blog VelocitAI\n');
    console.log('Choisissez une option:');
    console.log('1. 📋 Voir la file d\'attente');
    console.log('2. 📊 Voir les statistiques');
    console.log('3. 📅 Simuler les publications (7 jours)');
    console.log('4. 🚀 Publier le prochain article maintenant');
    console.log('5. ❌ Quitter\n');
  }

  /**
   * Publie le prochain article manuellement
   */
  async publishNext() {
    try {
      console.log('🚀 Publication manuelle du prochain article...\n');
      await this.automation.run();
    } catch (error) {
      console.error('❌ Erreur lors de la publication:', error);
    }
  }
}

// Interface en ligne de commande
async function main() {
  const manager = new BlogQueueManager();
  
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'queue':
    case 'q':
      await manager.showQueue();
      break;
    
    case 'stats':
    case 's':
      await manager.showStats();
      break;
    
    case 'simulate':
    case 'sim':
      const days = parseInt(args[1]) || 7;
      await manager.simulatePublications(days);
      break;
    
    case 'publish':
    case 'p':
      await manager.publishNext();
      break;
    
    case 'help':
    case 'h':
    default:
      console.log('🤖 Gestionnaire de file d\'attente blog VelocitAI\n');
      console.log('Usage: node scripts/prepare-blog-queue.js [commande]\n');
      console.log('Commandes disponibles:');
      console.log('  queue, q       - Afficher la file d\'attente');
      console.log('  stats, s       - Afficher les statistiques');
      console.log('  simulate, sim  - Simuler les publications (défaut: 7 jours)');
      console.log('  publish, p     - Publier le prochain article maintenant');
      console.log('  help, h        - Afficher cette aide\n');
      console.log('Exemples:');
      console.log('  node scripts/prepare-blog-queue.js queue');
      console.log('  node scripts/prepare-blog-queue.js simulate 14');
      console.log('  node scripts/prepare-blog-queue.js publish');
      break;
  }
}

// Exécution
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  });
}

module.exports = BlogQueueManager;