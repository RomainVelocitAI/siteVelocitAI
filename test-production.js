const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Lancement du test Playwright sur production...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture des erreurs console
  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      networkErrors.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(`Page error: ${error.message}`);
  });

  try {
    console.log('📍 Navigation vers https://velocit-ai.fr...');
    await page.goto('https://velocit-ai.fr', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Page chargée avec succès\n');

    // Attendre 3 secondes pour laisser les hydrations se terminer
    console.log('⏳ Attente de 3 secondes pour hydration complète...');
    await page.waitForTimeout(3000);

    // Récupérer le titre de la page
    const title = await page.title();
    console.log(`📄 Titre de la page: ${title}\n`);

    // Afficher les résultats
    console.log('═══════════════════════════════════════════════════════════');
    console.log('                    RÉSULTATS DU TEST                      ');
    console.log('═══════════════════════════════════════════════════════════\n');

    if (networkErrors.length > 0) {
      console.log('❌ ERREURS RÉSEAU:');
      networkErrors.forEach(err => {
        console.log(`   ${err.status} ${err.statusText} - ${err.url}`);
      });
      console.log('');
    } else {
      console.log('✅ AUCUNE ERREUR RÉSEAU (200 OK)\n');
    }

    if (consoleErrors.length > 0) {
      console.log('❌ ERREURS CONSOLE:');
      consoleErrors.forEach((err, index) => {
        console.log(`   ${index + 1}. ${err}`);
      });
      console.log(`\n   Total: ${consoleErrors.length} erreurs console détectées`);
    } else {
      console.log('✅ AUCUNE ERREUR CONSOLE (pas de #418, pas de #423)\n');
    }

    console.log('═══════════════════════════════════════════════════════════');

    // Vérifier spécifiquement les erreurs hydration
    const hasHydrationErrors = consoleErrors.some(err =>
      err.includes('#418') ||
      err.includes('#423') ||
      err.includes('Hydration') ||
      err.includes('hydration')
    );

    if (hasHydrationErrors) {
      console.log('\n⚠️  ERREURS HYDRATION DÉTECTÉES - Le problème persiste');
      process.exit(1);
    } else if (consoleErrors.length > 0) {
      console.log('\n⚠️  Autres erreurs détectées (non-hydration)');
      process.exit(1);
    } else if (networkErrors.length > 0) {
      console.log('\n⚠️  Erreurs réseau détectées');
      process.exit(1);
    } else {
      console.log('\n🎉 SUCCÈS COMPLET - Site fonctionnel sans erreurs !');
      process.exit(0);
    }

  } catch (error) {
    console.log('\n❌ ERREUR CRITIQUE:');
    console.log(error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
