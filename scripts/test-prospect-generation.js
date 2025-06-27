#!/usr/bin/env node

/**
 * Script de test pour la génération de pages prospects
 * Simule un appel n8n pour tester le workflow complet
 */

const fs = require('fs');
const path = require('path');

// Données de test
const testProspects = [
  {
    name: 'Test Minimal',
    data: {
      prospectName: 'Jean Dupont',
      companyName: 'Restaurant Le Palmier',
      email: 'jean@lepalmier.re'
    }
  },
  {
    name: 'Test Complet',
    data: {
      prospectName: 'Marie Martin',
      companyName: 'Boutique Mode Réunion',
      email: 'marie@boutique-mode.re',
      phone: '+262 692 123 456',
      industry: 'Commerce de détail',
      companySize: '10-50 employés',
      challenges: [
        'Gestion manuelle des stocks',
        'Réponse clients trop lente',
        'Processus de commande complexe'
      ],
      goals: [
        'Automatiser la gestion des stocks',
        'Améliorer l\'expérience client',
        'Augmenter les ventes en ligne'
      ],
      budget: '15000',
      timeline: '3 mois',
      leadSource: 'Facebook Ads',
      leadScore: 75,
      customMessage: 'Nous avons remarqué vos excellents avis clients et souhaitons vous aider à automatiser vos processus.',
      offerType: 'premium',
      ctaText: 'Réserver mon audit gratuit',
      ctaUrl: 'https://calendly.com/velocitai/audit-gratuit'
    }
  },
  {
    name: 'Test Enterprise',
    data: {
      prospectName: 'Paul Rodriguez',
      companyName: 'Tech Solutions Océan Indien',
      email: 'paul@techsolutions.re',
      phone: '+262 693 456 789',
      industry: 'Technologies',
      companySize: '100+ employés',
      challenges: [
        'Scalabilité des processus',
        'Intégration système complexe',
        'Gestion multi-sites'
      ],
      goals: [
        'Transformation digitale complète',
        'Optimisation des coûts opérationnels',
        'Amélioration de la productivité'
      ],
      budget: '50000',
      timeline: '6 mois',
      leadSource: 'LinkedIn',
      leadScore: 95,
      customMessage: 'Votre expertise technique nous impressionne. Discutons de la façon dont nous pouvons vous aider à automatiser vos processus internes.',
      offerType: 'enterprise',
      ctaText: 'Planifier une démonstration executive',
      ctaUrl: 'https://calendly.com/velocitai/demo-executive'
    }
  }
];

// Fonction pour tester l'API
async function testAPI(testData) {
  const apiUrl = process.env.TEST_API_URL || 'http://localhost:3000/api/generate-prospect-page';
  const apiKey = process.env.PROSPECT_API_KEY || 'test-api-key';

  console.log(`\n🧪 Test: ${testData.name}`);
  console.log('📊 Données:', JSON.stringify(testData.data, null, 2));

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(testData.data)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Succès!');
      console.log('📄 Page générée:', result.data.url);
      console.log('🔗 Slug:', result.data.slug);
      return { success: true, result };
    } else {
      console.log('❌ Erreur:', response.status);
      console.log('📝 Message:', result.error || result.message);
      return { success: false, result };
    }
  } catch (error) {
    console.log('💥 Erreur de connexion:', error.message);
    return { success: false, error: error.message };
  }
}

// Fonction pour vérifier les fichiers générés
function checkGeneratedFiles(slug) {
  const pageFile = path.join(process.cwd(), 'pages', 'prospect', `${slug}.tsx`);
  const dataFile = path.join(process.cwd(), 'data', 'prospects', `${slug}.json`);

  console.log('\n📁 Vérification des fichiers:');
  
  if (fs.existsSync(pageFile)) {
    console.log('✅ Fichier page créé:', pageFile);
  } else {
    console.log('❌ Fichier page manquant:', pageFile);
  }

  if (fs.existsSync(dataFile)) {
    console.log('✅ Fichier données créé:', dataFile);
    
    // Vérifier le contenu du fichier de données
    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      console.log('📊 Données sauvegardées:', Object.keys(data).join(', '));
    } catch (error) {
      console.log('❌ Erreur lecture fichier données:', error.message);
    }
  } else {
    console.log('❌ Fichier données manquant:', dataFile);
  }
}

// Fonction pour nettoyer les fichiers de test
function cleanupTestFiles() {
  const testSlugs = [
    'restaurant-le-palmier',
    'boutique-mode-reunion', 
    'tech-solutions-ocean-indien'
  ];

  console.log('\n🧹 Nettoyage des fichiers de test...');

  testSlugs.forEach(slug => {
    const pageFile = path.join(process.cwd(), 'pages', 'prospect', `${slug}.tsx`);
    const dataFile = path.join(process.cwd(), 'data', 'prospects', `${slug}.json`);

    [pageFile, dataFile].forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log('🗑️ Supprimé:', file);
      }
    });
  });
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--cleanup')) {
    cleanupTestFiles();
    return;
  }

  if (args.includes('--help')) {
    console.log(`
🧪 Script de test pour la génération de pages prospects

Usage: node test-prospect-generation.js [options]

Options:
  --help     Afficher cette aide
  --cleanup  Nettoyer les fichiers de test
  --single   Tester uniquement le premier cas

Variables d'environnement:
  TEST_API_URL        URL de l'API (défaut: http://localhost:3000/api/generate-prospect-page)
  PROSPECT_API_KEY    Clé API pour l'authentification

Exemple:
  PROSPECT_API_KEY=test-key node test-prospect-generation.js
`);
    return;
  }

  console.log('🚀 Test de génération de pages prospects');
  console.log('=====================================');

  const results = [];
  const testsToRun = args.includes('--single') ? [testProspects[0]] : testProspects;

  for (const testData of testsToRun) {
    const result = await testAPI(testData);
    results.push({ test: testData.name, ...result });

    if (result.success && result.result.data) {
      checkGeneratedFiles(result.result.data.slug);
    }

    // Pause entre les tests
    if (testsToRun.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Résumé des résultats
  console.log('\n📊 RÉSUMÉ DES TESTS');
  console.log('==================');
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.test}`);
    if (!result.success) {
      console.log(`   Erreur: ${result.result?.error || result.error}`);
    }
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n📈 Résultat: ${successCount}/${results.length} tests réussis`);

  if (successCount === results.length) {
    console.log('🎉 Tous les tests sont passés avec succès!');
  } else {
    console.log('⚠️ Certains tests ont échoué. Vérifiez la configuration.');
    process.exit(1);
  }
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
  console.error('💥 Erreur non gérée:', error);
  process.exit(1);
});

// Exécution
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  });
}