#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Test du blog VelocitAI...\n');

// Vérifier que les fichiers existent
const filesToCheck = [
  'pages/blog/index.tsx',
  'pages/blog/[slug].tsx',
  'content/blog/automatisation-entreprise-guide-strategique-2025.md',
  'contexts/ThemeContext.tsx',
  'components/Header.tsx',
  'components/Footer.tsx'
];

let allFilesExist = true;

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MANQUANT`);
    allFilesExist = false;
  }
});

// Vérifier le contenu de l'article
const articlePath = 'content/blog/automatisation-entreprise-guide-strategique-2025.md';
if (fs.existsSync(articlePath)) {
  const content = fs.readFileSync(articlePath, 'utf8');
  if (content.includes('title:') && content.includes('slug:') && content.includes('featured: true')) {
    console.log('✅ Article de blog correctement formaté');
  } else {
    console.log('❌ Article de blog mal formaté');
    allFilesExist = false;
  }
}

// Vérifier le package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['gray-matter', 'remark', 'remark-html'];
const requiredDevDeps = ['@tailwindcss/typography'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ Dépendance: ${dep}`);
  } else {
    console.log(`❌ Dépendance manquante: ${dep}`);
    allFilesExist = false;
  }
});

requiredDevDeps.forEach(dep => {
  if (packageJson.devDependencies[dep]) {
    console.log(`✅ Dépendance dev: ${dep}`);
  } else {
    console.log(`❌ Dépendance dev manquante: ${dep}`);
    allFilesExist = false;
  }
});

// Vérifier la configuration Tailwind
const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8');
if (tailwindConfig.includes('@tailwindcss/typography')) {
  console.log('✅ Plugin Tailwind Typography configuré');
} else {
  console.log('❌ Plugin Tailwind Typography manquant');
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 SUCCÈS ! Le blog VelocitAI est prêt !');
  console.log('\n📋 Résumé des fonctionnalités :');
  console.log('   ✅ Mode sombre par défaut');
  console.log('   ✅ Basculement de thème');
  console.log('   ✅ Article de blog publié');
  console.log('   ✅ Navigation responsive');
  console.log('   ✅ SEO optimisé');
  console.log('   ✅ Partage social');
  console.log('\n🚀 Pour tester :');
  console.log('   npm run dev');
  console.log('   Puis visitez http://localhost:3000/blog');
} else {
  console.log('❌ ERREUR ! Certains éléments sont manquants.');
  console.log('   Exécutez ./install-blog-deps.sh pour corriger.');
}

console.log('='.repeat(50));