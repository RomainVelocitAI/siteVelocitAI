#!/usr/bin/env node

/**
 * Script pour configurer la base Airtable parfaite pour le blog automation
 * Avec support pour 6 images par article
 */

const fetch = require('node-fetch');

// Configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID; // À définir

class AirtableBaseSetup {
  constructor() {
    this.headers = {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Structure parfaite pour la table "Blog Articles"
   */
  getBlogTableStructure() {
    return {
      name: 'Blog Articles',
      description: 'Table principale pour la gestion automatisée des articles de blog VelocitAI',
      fields: [
        // === CHAMPS PRINCIPAUX ===
        {
          name: 'Title',
          type: 'singleLineText',
          description: 'Titre principal de l\'article',
          options: { required: true }
        },
        {
          name: 'Description',
          type: 'longText',
          description: 'Description courte pour les métadonnées et aperçus'
        },
        {
          name: 'Content',
          type: 'longText',
          description: 'Contenu complet de l\'article en Markdown'
        },
        {
          name: 'Slug',
          type: 'singleLineText',
          description: 'URL slug (généré automatiquement si vide)'
        },
        {
          name: 'Author',
          type: 'singleLineText',
          description: 'Auteur de l\'article (défaut: VelocitAI)'
        },
        {
          name: 'Category',
          type: 'singleSelect',
          description: 'Catégorie principale de l\'article',
          options: {
            choices: [
              { name: 'Automatisation', color: 'blue' },
              { name: 'Intelligence Artificielle', color: 'purple' },
              { name: 'Productivité', color: 'green' },
              { name: 'Stratégie', color: 'orange' },
              { name: 'Cas d\'usage', color: 'red' },
              { name: 'Guides', color: 'yellow' }
            ]
          }
        },
        {
          name: 'Tags',
          type: 'multipleSelects',
          description: 'Tags pour le référencement et la catégorisation',
          options: {
            choices: [
              { name: 'chatbot IA', color: 'blue' },
              { name: 'automatisation', color: 'green' },
              { name: 'service client', color: 'purple' },
              { name: 'PME', color: 'orange' },
              { name: 'ROI', color: 'red' },
              { name: 'productivité', color: 'yellow' },
              { name: 'workflow', color: 'gray' },
              { name: 'n8n', color: 'cyan' },
              { name: 'zapier', color: 'pink' }
            ]
          }
        },

        // === CHAMPS DE PUBLICATION ===
        {
          name: 'Status',
          type: 'singleSelect',
          description: 'Statut de publication de l\'article',
          options: {
            choices: [
              { name: 'Draft', color: 'gray' },
              { name: 'Scheduled', color: 'yellow' },
              { name: 'Published', color: 'green' },
              { name: 'Archived', color: 'red' }
            ]
          }
        },
        {
          name: 'Published',
          type: 'checkbox',
          description: 'Article publié (coché automatiquement lors de la publication)'
        },
        {
          name: 'Publication Date',
          type: 'date',
          description: 'Date de publication (programmée ou effective)'
        },
        {
          name: 'Featured',
          type: 'checkbox',
          description: 'Article mis en avant sur la page d\'accueil'
        },

        // === CHAMPS SEO ===
        {
          name: 'SEO Title',
          type: 'singleLineText',
          description: 'Titre optimisé pour les moteurs de recherche (60 caractères max)'
        },
        {
          name: 'SEO Description',
          type: 'longText',
          description: 'Meta description pour les moteurs de recherche (160 caractères max)'
        },
        {
          name: 'SEO Keywords',
          type: 'multipleSelects',
          description: 'Mots-clés principaux pour le référencement',
          options: {
            choices: [
              { name: 'automatisation entreprise', color: 'blue' },
              { name: 'chatbot IA', color: 'purple' },
              { name: 'service client automatisé', color: 'green' },
              { name: 'productivité PME', color: 'orange' },
              { name: 'workflow automation', color: 'red' },
              { name: 'intelligence artificielle', color: 'yellow' }
            ]
          }
        },

        // === CHAMPS TECHNIQUES ===
        {
          name: 'Read Time',
          type: 'number',
          description: 'Temps de lecture estimé en minutes'
        },
        {
          name: 'Word Count',
          type: 'number',
          description: 'Nombre de mots dans l\'article'
        },

        // === IMAGES PRINCIPALES ===
        {
          name: 'Featured Image URL',
          type: 'url',
          description: 'URL de l\'image principale de l\'article'
        },
        {
          name: 'Featured Image Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour l\'image principale'
        },

        // === 6 IMAGES POUR LE CONTENU ===
        {
          name: 'Image 1 Prompt',
          type: 'longText',
          description: 'Prompt pour générer la première image avec IA'
        },
        {
          name: 'Image 1 URL',
          type: 'url',
          description: 'URL de la première image générée'
        },
        {
          name: 'Image 1 Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour la première image'
        },
        {
          name: 'Image 2 Prompt',
          type: 'longText',
          description: 'Prompt pour générer la deuxième image avec IA'
        },
        {
          name: 'Image 2 URL',
          type: 'url',
          description: 'URL de la deuxième image générée'
        },
        {
          name: 'Image 2 Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour la deuxième image'
        },
        {
          name: 'Image 3 Prompt',
          type: 'longText',
          description: 'Prompt pour générer la troisième image avec IA'
        },
        {
          name: 'Image 3 URL',
          type: 'url',
          description: 'URL de la troisième image générée'
        },
        {
          name: 'Image 3 Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour la troisième image'
        },
        {
          name: 'Image 4 Prompt',
          type: 'longText',
          description: 'Prompt pour générer la quatrième image avec IA'
        },
        {
          name: 'Image 4 URL',
          type: 'url',
          description: 'URL de la quatrième image générée'
        },
        {
          name: 'Image 4 Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour la quatrième image'
        },
        {
          name: 'Image 5 Prompt',
          type: 'longText',
          description: 'Prompt pour générer la cinquième image avec IA'
        },
        {
          name: 'Image 5 URL',
          type: 'url',
          description: 'URL de la cinquième image générée'
        },
        {
          name: 'Image 5 Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour la cinquième image'
        },
        {
          name: 'Image 6 Prompt',
          type: 'longText',
          description: 'Prompt pour générer la sixième image avec IA'
        },
        {
          name: 'Image 6 URL',
          type: 'url',
          description: 'URL de la sixième image générée'
        },
        {
          name: 'Image 6 Alt',
          type: 'singleLineText',
          description: 'Texte alternatif pour la sixième image'
        },

        // === MÉTADONNÉES ET SUIVI ===
        {
          name: 'Images Generated',
          type: 'checkbox',
          description: 'Images générées automatiquement'
        },
        {
          name: 'Images Generation Date',
          type: 'dateTime',
          description: 'Date et heure de génération des images'
        },
        {
          name: 'Created',
          type: 'createdTime',
          description: 'Date de création de l\'enregistrement'
        },
        {
          name: 'Last Modified',
          type: 'lastModifiedTime',
          description: 'Dernière modification'
        },
        {
          name: 'Created By',
          type: 'createdBy',
          description: 'Créé par'
        },
        {
          name: 'Last Modified By',
          type: 'lastModifiedBy',
          description: 'Dernière modification par'
        },

        // === CHAMPS DE PERFORMANCE ===
        {
          name: 'Views',
          type: 'number',
          description: 'Nombre de vues (à remplir manuellement ou via analytics)'
        },
        {
          name: 'Engagement Score',
          type: 'number',
          description: 'Score d\'engagement (calculé)'
        },
        {
          name: 'Notes',
          type: 'longText',
          description: 'Notes internes sur l\'article'
        }
      ]
    };
  }

  /**
   * Crée des vues optimisées pour la gestion du blog
   */
  getBlogViews() {
    return [
      {
        name: '📝 Articles à Publier',
        type: 'grid',
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'Status',
              operator: 'is',
              value: 'Scheduled'
            },
            {
              field: 'Published',
              operator: 'is',
              value: false
            }
          ]
        },
        sort: [
          {
            field: 'Created',
            direction: 'asc'
          }
        ],
        visibleFields: ['Title', 'Status', 'Publication Date', 'Category', 'Images Generated', 'Created']
      },
      {
        name: '✅ Articles Publiés',
        type: 'grid',
        filter: {
          type: 'and',
          conditions: [
            {
              field: 'Status',
              operator: 'is',
              value: 'Published'
            },
            {
              field: 'Published',
              operator: 'is',
              value: true
            }
          ]
        },
        sort: [
          {
            field: 'Publication Date',
            direction: 'desc'
          }
        ],
        visibleFields: ['Title', 'Publication Date', 'Category', 'Views', 'Featured', 'Last Modified']
      },
      {
        name: '📋 Brouillons',
        type: 'grid',
        filter: {
          field: 'Status',
          operator: 'is',
          value: 'Draft'
        },
        sort: [
          {
            field: 'Last Modified',
            direction: 'desc'
          }
        ],
        visibleFields: ['Title', 'Category', 'Word Count', 'Images Generated', 'Last Modified']
      },
      {
        name: '🎨 Gestion Images',
        type: 'grid',
        visibleFields: [
          'Title', 
          'Images Generated', 
          'Images Generation Date',
          'Image 1 URL', 
          'Image 2 URL', 
          'Image 3 URL',
          'Image 4 URL', 
          'Image 5 URL', 
          'Image 6 URL'
        ]
      },
      {
        name: '📊 Performance',
        type: 'grid',
        filter: {
          field: 'Published',
          operator: 'is',
          value: true
        },
        sort: [
          {
            field: 'Views',
            direction: 'desc'
          }
        ],
        visibleFields: ['Title', 'Views', 'Engagement Score', 'Publication Date', 'Category', 'Featured']
      },
      {
        name: '📅 Planning',
        type: 'calendar',
        dateField: 'Publication Date',
        colorField: 'Category'
      }
    ];
  }

  /**
   * Affiche la structure recommandée
   */
  displayStructure() {
    console.log('🏗️  STRUCTURE AIRTABLE PARFAITE POUR BLOG VELOCITAI\n');
    
    const structure = this.getBlogTableStructure();
    
    console.log(`📋 Table: ${structure.name}`);
    console.log(`📝 Description: ${structure.description}\n`);
    
    console.log('📊 CHAMPS ORGANISÉS PAR CATÉGORIE:\n');
    
    const categories = {
      '📝 CONTENU': ['Title', 'Description', 'Content', 'Slug', 'Author', 'Category', 'Tags'],
      '🚀 PUBLICATION': ['Status', 'Published', 'Publication Date', 'Featured'],
      '🔍 SEO': ['SEO Title', 'SEO Description', 'SEO Keywords'],
      '⚙️ TECHNIQUE': ['Read Time', 'Word Count'],
      '🖼️ IMAGE PRINCIPALE': ['Featured Image URL', 'Featured Image Alt'],
      '🎨 6 IMAGES CONTENU': [
        'Image 1 Prompt', 'Image 1 URL', 'Image 1 Alt',
        'Image 2 Prompt', 'Image 2 URL', 'Image 2 Alt',
        'Image 3 Prompt', 'Image 3 URL', 'Image 3 Alt',
        'Image 4 Prompt', 'Image 4 URL', 'Image 4 Alt',
        'Image 5 Prompt', 'Image 5 URL', 'Image 5 Alt',
        'Image 6 Prompt', 'Image 6 URL', 'Image 6 Alt'
      ],
      '🤖 AUTOMATISATION': ['Images Generated', 'Images Generation Date'],
      '📈 SUIVI': ['Created', 'Last Modified', 'Created By', 'Last Modified By'],
      '📊 PERFORMANCE': ['Views', 'Engagement Score', 'Notes']
    };

    Object.entries(categories).forEach(([category, fields]) => {
      console.log(`${category}:`);
      fields.forEach(field => {
        const fieldDef = structure.fields.find(f => f.name === field);
        if (fieldDef) {
          console.log(`  • ${field} (${fieldDef.type})`);
          if (fieldDef.description) {
            console.log(`    ${fieldDef.description}`);
          }
        }
      });
      console.log('');
    });

    console.log('📋 VUES RECOMMANDÉES:\n');
    const views = this.getBlogViews();
    views.forEach(view => {
      console.log(`• ${view.name} (${view.type})`);
    });

    console.log('\n🚀 WORKFLOW AUTOMATISÉ:');
    console.log('1. Créer un article en statut "Draft"');
    console.log('2. Remplir le contenu et les 6 prompts d\'images');
    console.log('3. Passer en statut "Scheduled"');
    console.log('4. Le script génère automatiquement les 6 images');
    console.log('5. Publication automatique quotidienne séquentielle');
    console.log('6. Mise à jour du statut "Published" après publication');

    console.log('\n💡 CONFIGURATION REQUISE:');
    console.log('• AIRTABLE_API_KEY: Votre clé API Airtable');
    console.log('• AIRTABLE_BASE_ID: ID de votre base (commence par "app")');
    console.log('• REPLICATE_API_TOKEN: Pour la génération d\'images IA');
  }

  /**
   * Génère un exemple d'article pour tester la structure
   */
  generateSampleArticle() {
    return {
      'Title': 'Automatisation des Processus : Guide Complet 2025',
      'Description': 'Découvrez comment automatiser vos processus métier pour gagner en efficacité et réduire les coûts. Guide pratique avec exemples concrets.',
      'Content': `# Automatisation des Processus : Guide Complet 2025

## Introduction

L'automatisation des processus métier représente aujourd'hui un enjeu majeur pour les entreprises souhaitant rester compétitives...

## Les Fondamentaux de l'Automatisation

### Qu'est-ce que l'automatisation des processus ?

L'automatisation consiste à utiliser la technologie pour exécuter des tâches répétitives sans intervention humaine...

## Conclusion

L'automatisation n'est plus une option mais une nécessité pour les entreprises modernes.`,
      'Category': 'Automatisation',
      'Tags': ['automatisation', 'productivité', 'workflow'],
      'Status': 'Scheduled',
      'Published': false,
      'Featured': true,
      'SEO Title': 'Automatisation Processus 2025 : Guide Complet | VelocitAI',
      'SEO Description': 'Guide complet automatisation processus métier 2025. Méthodes, outils, ROI. Transformez votre entreprise avec l\'automatisation intelligente.',
      'SEO Keywords': ['automatisation entreprise', 'workflow automation', 'productivité PME'],
      'Read Time': 8,
      'Word Count': 1200,
      'Image 1 Prompt': 'Modern business process automation dashboard with flowing data streams, clean interface, professional blue and white design',
      'Image 1 Alt': 'Dashboard d\'automatisation des processus métier moderne',
      'Image 2 Prompt': 'Team collaboration in automated workflow environment, people working with digital tools, modern office setting',
      'Image 2 Alt': 'Équipe travaillant avec des outils d\'automatisation',
      'Image 3 Prompt': 'ROI statistics and performance metrics for business automation, charts showing growth, professional data visualization',
      'Image 3 Alt': 'Statistiques ROI de l\'automatisation d\'entreprise',
      'Image 4 Prompt': 'Integration of multiple business systems through automation, connected platforms, technology illustration',
      'Image 4 Alt': 'Intégration de systèmes d\'entreprise via l\'automatisation',
      'Image 5 Prompt': 'Before and after comparison of manual vs automated processes, efficiency improvement visualization',
      'Image 5 Alt': 'Comparaison processus manuel vs automatisé',
      'Image 6 Prompt': 'Future of business automation with AI and machine learning, futuristic office environment',
      'Image 6 Alt': 'Futur de l\'automatisation d\'entreprise avec IA',
      'Notes': 'Article pilote pour tester la nouvelle structure avec 6 images'
    };
  }
}

// Fonctions utilitaires
function displayUsage() {
  console.log('🤖 SETUP AIRTABLE BASE - VelocitAI Blog Automation\n');
  console.log('Usage: node scripts/setup-airtable-base.js [command]\n');
  console.log('Commandes:');
  console.log('  structure  - Affiche la structure recommandée');
  console.log('  sample     - Génère un exemple d\'article');
  console.log('  help       - Affiche cette aide\n');
  console.log('Variables d\'environnement requises:');
  console.log('  AIRTABLE_API_KEY - Votre clé API Airtable');
  console.log('  AIRTABLE_BASE_ID - ID de votre base Airtable\n');
}

// Exécution
async function main() {
  const setup = new AirtableBaseSetup();
  const command = process.argv[2];

  switch (command) {
    case 'structure':
      setup.displayStructure();
      break;
    
    case 'sample':
      console.log('📝 EXEMPLE D\'ARTICLE POUR TESTER LA STRUCTURE:\n');
      const sample = setup.generateSampleArticle();
      console.log(JSON.stringify(sample, null, 2));
      break;
    
    case 'help':
    default:
      displayUsage();
      break;
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  });
}

module.exports = AirtableBaseSetup;