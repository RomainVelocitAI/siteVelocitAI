#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PAGES_DIR = path.join(__dirname, '../pages/prospect');
const TEMPLATE_PATH = path.join(__dirname, '../templates/ProspectLanding.tsx');

async function generateProspectPage(prospectData) {
  try {
    // Créer le répertoire s'il n'existe pas
    await fs.mkdir(PAGES_DIR, { recursive: true });
    
    // Générer un slug à partir du nom de l'entreprise
    const slug = prospectData.companyName
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/-+/g, '-'); // Supprimer les tirets doubles
    
    // Chemin du fichier de la nouvelle page
    const pagePath = path.join(PAGES_DIR, `${slug}.tsx`);
    
    // Lire le contenu du template
    let content = await fs.readFile(TEMPLATE_PATH, 'utf8');
    
    // Mettre à jour les valeurs par défaut avec les données du prospect
    content = content.replace(/prospectName: 'Prénom Nom'/g, `prospectName: '${prospectData.prospectName.replace(/'/g, "\\'")}'`);
    content = content.replace(/companyName: 'Nom de l\\'entreprise'/g, `companyName: '${prospectData.companyName.replace(/'/g, "\\'")}'`);
    content = content.replace(/email: 'contact@entreprise.com'/g, `email: '${prospectData.email}'`);
    content = content.replace(/phone: '01 23 45 67 89'/g, `phone: '${prospectData.phone}'`);
    
    // Écrire le nouveau fichier de page
    await fs.writeFile(pagePath, content, 'utf8');
    
    // Mettre à jour le sitemap (optionnel)
    await updateSitemap(slug);
    
    // Commiter et pousser les changements (si configuré)
    if (process.env.GIT_AUTO_COMMIT === 'true') {
      await commitAndPush(slug);
    }
    
    return {
      success: true,
      url: `http://localhost:3000/prospect/${slug}`,
      filePath: pagePath
    };
    
  } catch (error) {
    console.error('Erreur lors de la génération de la page :', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function updateSitemap(slug) {
  try {
    const sitemapPath = path.join(__dirname, '../pages/sitemap.xml.tsx');
    let sitemap = await fs.readFile(sitemapPath, 'utf8');
    
    // Ajouter la nouvelle URL au sitemap
    const newUrl = `\n    <url>\n      <loc>http://localhost:3000/prospect/${slug}</loc>\n      <lastmod>${new Date().toISOString()}</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>0.8</priority>\n    </url>`;
    
    // Insérer avant la balise de fermeture </urlset>
    sitemap = sitemap.replace('</urlset>', `${newUrl}\n  </urlset>`);
    
    await fs.writeFile(sitemapPath, sitemap, 'utf8');
    
  } catch (error) {
    console.warn('Impossible de mettre à jour le sitemap :', error.message);
  }
}

async function commitAndPush(slug) {
  try {
    // Ajouter les fichiers modifiés
    execSync('git add .', { stdio: 'inherit' });
    
    // Créer un commit
    const commitMessage = `Ajout de la landing page pour ${slug}`;
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // Pousser les changements
    execSync('git push', { stdio: 'inherit' });
    
  } catch (error) {
    console.warn('Erreur lors du commit/push Git :', error.message);
  }
}

// Exemple d'utilisation via ligne de commande
if (require.main === module) {
  const prospectData = {
    prospectName: process.argv[2] || 'Prénom Nom',
    companyName: process.argv[3] || 'Nom de l\'entreprise',
    email: process.argv[4] || 'contact@entreprise.com',
    phone: process.argv[5] || '01 23 45 67 89',
  };
  
  generateProspectPage(prospectData)
    .then(result => {
      if (result.success) {
        console.log('Page générée avec succès :', result.url);
        process.exit(0);
      } else {
        console.error('Erreur :', result.error);
        process.exit(1);
      }
    });
}

module.exports = generateProspectPage;
