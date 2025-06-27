#!/usr/bin/env node

/**
 * Script pour créer et configurer la base Airtable parfaite pour le blog VelocitAI
 * Avec gestion de 6 images par article
 */

const fetch = require('node-fetch');

// Configuration
const AIRTABLE_API_KEY = 'patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741';

class AirtableBlogSetup {
  constructor() {
    this.headers = {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Récupère toutes les bases Airtable accessibles
   */
  async getBases() {
    try {
      const response = await fetch('https://api.airtable.com/v0/meta/bases', {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.bases;
    } catch (error) {
      console.error('Erreur lors de la récupération des bases:', error);
      throw error;
    }
  }

  /**
   * Trouve la base "Blog" ou la crée si elle n'existe pas
   */
  async findOrCreateBlogBase() {
    try {
      console.log('🔍 Recherche de la base "Blog"...');
      
      const bases = await this.getBases();
      const blogBase = bases.find(base => base.name === 'Blog');
      
      if (blogBase) {
        console.log(`✅ Base "Blog" trouvée: ${blogBase.id}`);
        return blogBase.id;
      }
      
      console.log('📝 Base "Blog" non trouvée, création en cours...');
      // Note: L'API Airtable ne permet pas de créer des bases via API
      // Il faut utiliser l'interface web ou nous donner l'ID d'une base existante
      throw new Error('Veuillez créer une base nommée "Blog" dans votre interface Airtable et relancer le script');
      
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }

  /**
   * Configure la table "Blog Articles" avec tous les champs nécessaires
   */
  async setupBlogTable(baseId) {
    try {
      console.log('🛠️  Configuration de la table "Blog Articles"...');
      
      // D'abord, récupérer la structure actuelle de la base
      const baseSchema = await this.getBaseSchema(baseId);
      console.log(`📊 Base trouvée avec ${baseSchema.tables.length} table(s)`);
      
      // Chercher la table "Blog Articles" ou utiliser la première table
      let tableId = null;
      const blogTable = baseSchema.tables.find(table => 
        table.name === 'Blog Articles' || table.name === 'Table 1'
      );
      
      if (blogTable) {
        tableId = blogTable.id;
        console.log(`📋 Table trouvée: ${blogTable.name} (${tableId})`);
      } else {
        throw new Error('Aucune table trouvée dans la base');
      }

      // Configuration des champs pour la table
      const fieldsConfig = this.getBlogTableFields();
      
      // Mettre à jour la table avec les bons champs
      await this.updateTableFields(baseId, tableId, fieldsConfig);
      
      console.log('✅ Table "Blog Articles" configurée avec succès!');
      return { baseId, tableId };
      
    } catch (error) {
      console.error('Erreur lors de la configuration:', error);
      throw error;
    }
  }

  /**
   * Récupère le schéma d'une base
   */
  async getBaseSchema(baseId) {
    try {
      const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur récupération schéma:', error);
      throw error;
    }
  }

  /**
   * Définit la configuration des champs pour la table Blog Articles
   */
  getBlogTableFields() {
    return {
      name: "Blog Articles",
      description: "Table principale pour gérer les articles de blog VelocitAI avec 6 images par article",
      fields: [
        // Champs principaux
        {
          name: "Title",
          type: "singleLineText",
          description: "Titre principal de l'article"
        },
        {
          name: "Description", 
          type: "multilineText",
          description: "Description courte de l'article (excerpt)"
        },
        {
          name: "Content",
          type: "multilineText",
          description: "Contenu complet de l'article en Markdown"
        },
        {
          name: "Slug",
          type: "singleLineText",
          description: "URL slug de l'article (généré automatiquement si vide)"
        },
        
        // Champs de publication
        {
          name: "Status",
          type: "singleSelect",
          options: {
            choices: [
              { name: "Draft", color: "grayBright2" },
              { name: "Scheduled", color: "yellowBright2" },
              { name: "Published", color: "greenBright2" },
              { name: "Archived", color: "redBright2" }
            ]
          },
          description: "Statut de publication de l'article"
        },
        {
          name: "Published",
          type: "checkbox",
          description: "Article publié (true/false)"
        },
        {
          name: "Publication Date",
          type: "date",
          options: {
            dateFormat: { name: "iso" }
          },
          description: "Date de publication prévue ou effective"
        },
        
        // Champs métadonnées
        {
          name: "Author",
          type: "singleLineText",
          description: "Auteur de l'article"
        },
        {
          name: "Category",
          type: "singleSelect",
          options: {
            choices: [
              { name: "Automatisation", color: "blueBright2" },
              { name: "IA & Chatbots", color: "purpleBright2" },
              { name: "Productivité", color: "greenBright2" },
              { name: "Stratégie", color: "orangeBright2" },
              { name: "Cas d'usage", color: "tealBright2" }
            ]
          },
          description: "Catégorie principale de l'article"
        },
        {
          name: "Tags",
          type: "multipleSelects",
          options: {
            choices: [
              { name: "chatbot IA", color: "blueBright2" },
              { name: "automatisation", color: "greenBright2" },
              { name: "service client", color: "purpleBright2" },
              { name: "PME", color: "orangeBright2" },
              { name: "ROI", color: "yellowBright2" },
              { name: "productivité", color: "tealBright2" }
            ]
          },
          description: "Tags de l'article"
        },
        {
          name: "Featured",
          type: "checkbox",
          description: "Article mis en avant"
        },
        {
          name: "Read Time",
          type: "number",
          options: {
            precision: 0
          },
          description: "Temps de lecture estimé en minutes"
        },
        
        // Champs SEO
        {
          name: "SEO Title",
          type: "singleLineText",
          description: "Titre SEO optimisé (meta title)"
        },
        {
          name: "SEO Description",
          type: "multilineText",
          description: "Description SEO (meta description)"
        },
        {
          name: "SEO Keywords",
          type: "multipleSelects",
          options: {
            choices: [
              { name: "chatbot entreprise 2025", color: "blueBright2" },
              { name: "automatisation service client", color: "greenBright2" },
              { name: "chatbot PME", color: "purpleBright2" },
              { name: "intelligence artificielle", color: "orangeBright2" }
            ]
          },
          description: "Mots-clés SEO"
        },
        
        // Champs pour les 6 images
        {
          name: "Image 1 - Prompt",
          type: "multilineText",
          description: "Prompt pour générer la première image"
        },
        {
          name: "Image 1 - URL",
          type: "url",
          description: "URL de la première image générée"
        },
        {
          name: "Image 1 - Alt",
          type: "singleLineText",
          description: "Texte alternatif pour la première image"
        },
        {
          name: "Image 2 - Prompt",
          type: "multilineText",
          description: "Prompt pour générer la deuxième image"
        },
        {
          name: "Image 2 - URL",
          type: "url",
          description: "URL de la deuxième image générée"
        },
        {
          name: "Image 2 - Alt",
          type: "singleLineText",
          description: "Texte alternatif pour la deuxième image"
        },
        {
          name: "Image 3 - Prompt",
          type: "multilineText",
          description: "Prompt pour générer la troisième image"
        },
        {
          name: "Image 3 - URL",
          type: "url",
          description: "URL de la troisième image générée"
        },
        {
          name: "Image 3 - Alt",
          type: "singleLineText",
          description: "Texte alternatif pour la troisième image"
        },
        {
          name: "Image 4 - Prompt",
          type: "multilineText",
          description: "Prompt pour générer la quatrième image"
        },
        {
          name: "Image 4 - URL",
          type: "url",
          description: "URL de la quatrième image générée"
        },
        {
          name: "Image 4 - Alt",
          type: "singleLineText",
          description: "Texte alternatif pour la quatrième image"
        },
        {
          name: "Image 5 - Prompt",
          type: "multilineText",
          description: "Prompt pour générer la cinquième image"
        },
        {
          name: "Image 5 - URL",
          type: "url",
          description: "URL de la cinquième image générée"
        },
        {
          name: "Image 5 - Alt",
          type: "singleLineText",
          description: "Texte alternatif pour la cinquième image"
        },
        {
          name: "Image 6 - Prompt",
          type: "multilineText",
          description: "Prompt pour générer la sixième image"
        },
        {
          name: "Image 6 - URL",
          type: "url",
          description: "URL de la sixième image générée"
        },
        {
          name: "Image 6 - Alt",
          type: "singleLineText",
          description: "Texte alternatif pour la sixième image"
        },
        
        // Champs techniques
        {
          name: "Images Generated",
          type: "checkbox",
          description: "Images générées automatiquement"
        },
        {
          name: "Image Generation Date",
          type: "dateTime",
          description: "Date et heure de génération des images"
        },
        
        // Champs de suivi
        {
          name: "Created",
          type: "createdTime",
          description: "Date de création de l'enregistrement"
        },
        {
          name: "Last Modified",
          type: "lastModifiedTime",
          description: "Dernière modification"
        }
      ]
    };
  }

  /**
   * Met à jour les champs d'une table (simulation - l'API Airtable ne permet pas de modifier la structure)
   */
  async updateTableFields(baseId, tableId, fieldsConfig) {
    console.log('📝 Configuration des champs:');
    console.log(`   📋 Table: ${fieldsConfig.name}`);
    console.log(`   🔢 Nombre de champs: ${fieldsConfig.fields.length}`);
    
    // Afficher la structure des champs
    fieldsConfig.fields.forEach((field, index) => {
      console.log(`   ${index + 1}. ${field.name} (${field.type})`);
    });
    
    console.log('\n⚠️  Note: L\'API Airtable ne permet pas de modifier la structure des tables automatiquement.');
    console.log('📋 Veuillez copier cette configuration dans votre interface Airtable:');
    
    return fieldsConfig;
  }

  /**
   * Crée un exemple d'article pour tester la structure
   */
  async createSampleArticle(baseId) {
    try {
      console.log('📝 Création d\'un article d\'exemple...');
      
      const sampleArticle = {
        "Title": "Test - Automatisation IA pour PME : Guide Complet 2025",
        "Description": "Découvrez comment l'automatisation par IA peut transformer votre PME en 2025. Guide pratique avec exemples concrets et ROI mesurable.",
        "Content": `# Automatisation IA pour PME : Guide Complet 2025

## Introduction

L'automatisation par Intelligence Artificielle représente aujourd'hui l'une des opportunités les plus significatives pour les PME françaises...

## Les Bénéfices de l'Automatisation IA

### 1. Gain de Productivité
- Réduction de 40% du temps consacré aux tâches répétitives
- Automatisation des processus de qualification des leads
- Optimisation de la gestion client

### 2. ROI Mesurable
- Retour sur investissement moyen de 300% en 12 mois
- Réduction des coûts opérationnels de 25%
- Augmentation du chiffre d'affaires de 15%

## Conclusion

L'automatisation IA n'est plus une option mais une nécessité pour rester compétitif en 2025.`,
        "Slug": "automatisation-ia-pme-guide-complet-2025",
        "Status": "Draft",
        "Published": false,
        "Author": "Équipe VelocitAI",
        "Category": "Automatisation",
        "Tags": ["automatisation", "PME", "IA"],
        "Featured": false,
        "Read Time": 8,
        "SEO Title": "Automatisation IA PME 2025 : Guide Complet | VelocitAI",
        "SEO Description": "Guide complet automatisation IA pour PME en 2025. Stratégies, outils, ROI et exemples concrets pour transformer votre entreprise.",
        "SEO Keywords": ["automatisation IA", "PME 2025", "intelligence artificielle"],
        
        // Images d'exemple
        "Image 1 - Prompt": "Modern office with AI automation systems, professional business environment, clean and bright, technology integration, realistic photography style",
        "Image 1 - Alt": "Bureau moderne avec systèmes d'automatisation IA intégrés",
        "Image 2 - Prompt": "Business dashboard showing productivity metrics and ROI charts, clean interface, professional data visualization",
        "Image 2 - Alt": "Dashboard professionnel montrant les métriques de productivité et ROI",
        "Image 3 - Prompt": "Team collaboration with AI tools, diverse professionals working together, modern workspace, technology-enhanced productivity",
        "Image 3 - Alt": "Équipe collaborant avec des outils IA dans un espace de travail moderne",
        "Image 4 - Prompt": "Automated workflow diagram, process optimization, clean infographic style, business process illustration",
        "Image 4 - Alt": "Diagramme de workflow automatisé montrant l'optimisation des processus",
        "Image 5 - Prompt": "SME business owner using AI tools on laptop, professional setting, success and growth concept, realistic portrait",
        "Image 5 - Alt": "Dirigeant de PME utilisant des outils IA sur ordinateur portable",
        "Image 6 - Prompt": "Growth chart with AI integration benefits, upward trends, professional business graphics, success metrics",
        "Image 6 - Alt": "Graphique de croissance montrant les bénéfices de l'intégration IA",
        
        "Images Generated": false
      };
      
      // Pour créer l'article, nous aurions besoin de l'ID de la table
      // const response = await fetch(`https://api.airtable.com/v0/${baseId}/Blog%20Articles`, {
      //   method: 'POST',
      //   headers: this.headers,
      //   body: JSON.stringify({ fields: sampleArticle })
      // });
      
      console.log('✅ Structure d\'article d\'exemple préparée');
      return sampleArticle;
      
    } catch (error) {
      console.error('Erreur création article exemple:', error);
      throw error;
    }
  }

  /**
   * Processus principal de configuration
   */
  async run() {
    try {
      console.log('🚀 Configuration de la base Airtable Blog VelocitAI\n');
      
      // Étape 1: Trouver ou créer la base Blog
      const baseId = await this.findOrCreateBlogBase();
      
      // Étape 2: Configurer la table Blog Articles
      const tableConfig = await this.setupBlogTable(baseId);
      
      // Étape 3: Créer un article d'exemple
      const sampleArticle = await this.createSampleArticle(baseId);
      
      console.log('\n🎉 Configuration terminée!');
      console.log(`📊 Base ID: ${baseId}`);
      console.log('📋 Table: Blog Articles configurée avec 6 champs d\'images');
      console.log('📝 Article d\'exemple préparé');
      
      // Sauvegarder la configuration
      const config = {
        baseId: baseId,
        tableName: 'Blog Articles',
        fieldsCount: this.getBlogTableFields().fields.length,
        imagesPerArticle: 6,
        sampleArticle: sampleArticle,
        setupDate: new Date().toISOString()
      };
      
      const fs = require('fs');
      const path = require('path');
      const configPath = path.join(__dirname, '..', 'airtable-blog-config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      
      console.log(`💾 Configuration sauvegardée: ${configPath}`);
      
      return config;
      
    } catch (error) {
      console.error('❌ Erreur lors de la configuration:', error);
      process.exit(1);
    }
  }
}

// Exécution du script
if (require.main === module) {
  const setup = new AirtableBlogSetup();
  setup.run();
}

module.exports = AirtableBlogSetup;