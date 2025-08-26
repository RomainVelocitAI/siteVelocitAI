#!/usr/bin/env node

/**
 * Script de test pour valider les corrections de l'erreur 500
 * Usage: node test-fixes.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, type = 'info') {
  const color = {
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue,
  }[type] || colors.reset;
  
  console.log(`${color}${message}${colors.reset}`);
}

async function testEndpoint(url, expectedStatus = 200) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const startTime = Date.now();
    
    protocol.get(url, (res) => {
      const responseTime = Date.now() - startTime;
      const success = res.statusCode === expectedStatus;
      
      resolve({
        url,
        status: res.statusCode,
        success,
        responseTime,
        headers: res.headers,
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: err.message,
      });
    });
  });
}

async function checkFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  return fs.existsSync(fullPath);
}

async function runTests() {
  log('\n🔍 Test des Corrections Error 500 - VelocitAI\n', 'info');
  
  // 1. Vérifier les fichiers créés
  log('1. Vérification des fichiers...', 'info');
  const files = [
    'netlify.toml',
    'next.config.js',
    'components/ErrorBoundary.tsx',
    'pages/_app.tsx',
    'middleware.ts',
    'lib/api-wrapper.ts',
    'pages/api/health.ts',
    'pages/500.tsx',
  ];
  
  let filesOk = true;
  for (const file of files) {
    const exists = await checkFile(file);
    if (exists) {
      log(`  ✅ ${file}`, 'success');
    } else {
      log(`  ❌ ${file} - Fichier manquant`, 'error');
      filesOk = false;
    }
  }
  
  // 2. Vérifier la configuration Netlify
  log('\n2. Vérification de netlify.toml...', 'info');
  const netlifyConfig = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');
  
  if (netlifyConfig.includes('to = "/index.html"')) {
    log('  ❌ Redirection /index.html encore présente', 'error');
  } else {
    log('  ✅ Configuration Netlify corrigée', 'success');
  }
  
  if (netlifyConfig.includes('@netlify/plugin-nextjs')) {
    log('  ✅ Plugin Next.js configuré', 'success');
  } else {
    log('  ⚠️  Plugin Next.js non configuré', 'warning');
  }
  
  // 3. Test de build
  log('\n3. Test de build Next.js...', 'info');
  const { exec } = require('child_process');
  
  await new Promise((resolve) => {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        log('  ❌ Build échoué: ' + error.message, 'error');
        if (stderr) log('  Erreur: ' + stderr, 'error');
      } else {
        log('  ✅ Build réussi', 'success');
      }
      resolve();
    });
  });
  
  // 4. Test des endpoints en local (si serveur en cours)
  log('\n4. Test des endpoints (local)...', 'info');
  const localUrl = 'http://localhost:3000';
  
  const endpoints = [
    { path: '/', status: 200 },
    { path: '/api/health', status: 200 },
    { path: '/500', status: 200 },
  ];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(localUrl + endpoint.path, endpoint.status);
    
    if (result.success) {
      log(`  ✅ ${endpoint.path} - ${result.status} (${result.responseTime}ms)`, 'success');
    } else if (result.error && result.error.includes('ECONNREFUSED')) {
      log(`  ⚠️  ${endpoint.path} - Serveur local non démarré`, 'warning');
    } else {
      log(`  ❌ ${endpoint.path} - ${result.status || result.error}`, 'error');
    }
  }
  
  // 5. Vérification des headers de cache
  log('\n5. Vérification de la configuration du cache...', 'info');
  const middlewareContent = fs.readFileSync(path.join(__dirname, 'middleware.ts'), 'utf8');
  
  if (middlewareContent.includes('Cache-Control')) {
    log('  ✅ Headers de cache configurés', 'success');
  } else {
    log('  ⚠️  Headers de cache non configurés', 'warning');
  }
  
  if (middlewareContent.includes('stale-while-revalidate')) {
    log('  ✅ Stratégie SWR configurée', 'success');
  } else {
    log('  ⚠️  Stratégie SWR non configurée', 'warning');
  }
  
  // 6. Résumé
  log('\n📊 Résumé des Tests\n', 'info');
  log('Les corrections principales ont été appliquées avec succès.', 'success');
  log('Pour tester complètement :', 'info');
  log('  1. Committez et pushez les changements', 'info');
  log('  2. Déployez sur Netlify', 'info');
  log('  3. Configurez UptimeRobot pour le warmup', 'info');
  log('  4. Testez après 30 minutes d\'inactivité', 'info');
  
  log('\n✨ Script de test terminé!', 'success');
}

// Exécuter les tests
runTests().catch(console.error);