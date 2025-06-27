#!/usr/bin/env node

/**
 * Script de test pour l'automatisation blog
 * Permet de tester la connexion Airtable et la génération d'articles
 */

const BlogAutomation = require('./auto-publish-blog');
const fs = require('fs');
const path = require('path');

class BlogAutomationTester {
  constructor() {
    this.automation = new BlogAutomation();
  }

  /**
   * Test de connexion à Airtable
   */
  async testAirtableConnection() {
    console.log('🔗 Test de connexion Airtable...');
    
    try {
      const articles = await this.automation.getScheduledArticles();
      console.log('✅ Connexion Airtable réussie');
      console.log(`📊 ${articles.length} article(s) programmé(s) trouvé(s)`);
      
      if (articles.length > 0) {
        console.log('\n📋 Articles trouvés:');
        articles.forEach((record, index) => {
          console.log(`  ${index + 1}. ${record.fields.Title}`);
          console.log(`     Date: ${record.fields['Publication Date']}`);
          console.log(`     Statut: ${record.fields.Status}`);
        });
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erreur de connexion Airtable:', error.message);
      return false;
    }
  }

  /**
   * Test de génération de contenu
   */
  async testContentGeneration() {
    console.log('\n📝 Test de génération de contenu...');
    
    // Données de test
    const testRecord = {
      id: 'test123',
      fields: {
        Title: 'Article de Test - Automatisation Blog',
        Description: 'Ceci est un article de test pour valider le système d\'automatisation.',
        Content: `# Introduction

Cet article de test permet de valider le bon fonctionnement du système d'automatisation.

## Fonctionnalités testées

- Génération du front matter
- Conversion en Markdown
- Estimation du temps de lecture
- Génération du slug

## Conclusion

Si vous lisez ceci, le système fonctionne correctement !`,
        Author: 'VelocitAI Test',
        Category: 'Test',
        Tags: ['test', 'automatisation', 'blog'],
        'Publication Date': new Date().toISOString().split('T')[0],
        'SEO Title': 'Article de Test - Automatisation Blog VelocitAI',
        'SEO Description': 'Test du système d\'automatisation de publication d\'articles de blog.',
        'SEO Keywords': ['test', 'automatisation', 'blog', 'velocitai'],
        'Image URL': '/images/blog/test-article.jpg',
        Featured: false
      }
    };

    try {
      // Générer le contenu
      const articleData = this.automation.generateMarkdownContent(testRecord);
      
      console.log('✅ Génération de contenu réussie');
      console.log(`📄 Slug généré: ${articleData.slug}`);
      console.log(`⏱️  Temps de lecture: ${articleData.frontMatter.readTime} min`);
      
      // Sauvegarder en mode test
      const testDir = path.join(process.cwd(), 'test-output');
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
      }
      
      const testFilePath = path.join(testDir, `${articleData.slug}.md`);
      fs.writeFileSync(testFilePath, articleData.content, 'utf8');
      
      console.log(`💾 Fichier de test sauvegardé: ${testFilePath}`);
      
      return true;
    } catch (error) {
      console.error('❌ Erreur de génération:', error.message);
      return false;
    }
  }

  /**
   * Test de mise à jour du sitemap
   */
  async testSitemapUpdate() {
    console.log('\n🗺️  Test de mise à jour du sitemap...');
    
    try {
      // Créer une sauvegarde du sitemap actuel
      const sitemapPath = path.join(process.cwd(), 'pages/sitemap.xml.tsx');
      const backupPath = path.join(process.cwd(), 'pages/sitemap.xml.tsx.backup');
      
      if (fs.existsSync(sitemapPath)) {
        fs.copyFileSync(sitemapPath, backupPath);
        console.log('💾 Sauvegarde du sitemap créée');
      }
      
      // Tester la mise à jour
      await this.automation.updateSitemap();
      
      console.log('✅ Mise à jour du sitemap réussie');
      
      // Restaurer la sauvegarde
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, sitemapPath);
        fs.unlinkSync(backupPath);
        console.log('🔄 Sitemap original restauré');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erreur de mise à jour sitemap:', error.message);
      return false;
    }
  }

  /**
   * Validation de l'environnement
   */
  validateEnvironment() {
    console.log('🔍 Validation de l\'environnement...');
    
    const requiredVars = ['AIRTABLE_API_KEY', 'AIRTABLE_BASE_ID'];
    const missingVars = [];
    
    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        missingVars.push(varName);
      }
    });
    
    if (missingVars.length > 0) {
      console.error('❌ Variables d\'environnement manquantes:');
      missingVars.forEach(varName => {
        console.error(`  - ${varName}`);
      });
      return false;
    }
    
    console.log('✅ Toutes les variables d\'environnement sont configurées');
    return true;
  }

  /**
   * Exécution de tous les tests
   */
  async runAllTests() {
    console.log('🧪 Démarrage des tests d\'automatisation blog\n');
    
    const results = {
      environment: false,
      airtable: false,
      content: false,
      sitemap: false
    };
    
    // Test 1: Environnement
    results.environment = this.validateEnvironment();
    
    if (!results.environment) {
      console.log('\n❌ Tests interrompus - Configuration manquante');
      return results;
    }
    
    // Test 2: Connexion Airtable
    results.airtable = await this.testAirtableConnection();
    
    // Test 3: Génération de contenu
    results.content = await this.testContentGeneration();
    
    // Test 4: Mise à jour sitemap
    results.sitemap = await this.testSitemapUpdate();
    
    // Résumé
    console.log('\n📊 Résumé des tests:');
    console.log(`  Environnement: ${results.environment ? '✅' : '❌'}`);
    console.log(`  Airtable: ${results.airtable ? '✅' : '❌'}`);
    console.log(`  Génération: ${results.content ? '✅' : '❌'}`);
    console.log(`  Sitemap: ${results.sitemap ? '✅' : '❌'}`);
    
    const allPassed = Object.values(results).every(result => result);
    
    if (allPassed) {
      console.log('\n🎉 Tous les tests sont passés ! Le système est prêt.');
    } else {
      console.log('\n⚠️  Certains tests ont échoué. Vérifiez la configuration.');
    }
    
    return results;
  }
}

// Exécution des tests
if (require.main === module) {
  const tester = new BlogAutomationTester();
  tester.runAllTests().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('❌ Erreur lors des tests:', error);
    process.exit(1);
  });
}

module.exports = BlogAutomationTester;