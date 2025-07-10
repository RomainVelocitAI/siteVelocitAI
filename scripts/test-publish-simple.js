#!/usr/bin/env node

/**
 * Test simple de publication d'article
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const AIRTABLE_API_KEY = 'patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741';
const AIRTABLE_BASE_ID = 'appBsMKnq8zWDIMNr';
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content/blog');

async function testPublish() {
  try {
    console.log('🚀 Test de publication d\'article...\n');
    
    // 1. Récupérer l'article directement par ID
    console.log('📄 Récupération de l\'article...');
    const command = `curl -H "Authorization: Bearer ${AIRTABLE_API_KEY}" "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blog%20Articles/recjoyJflRwerlwmT"`;
    
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes('% Total')) {
      throw new Error(`Erreur curl: ${stderr}`);
    }

    const data = JSON.parse(stdout);
    const record = data;
    const fields = record.fields;
    
    console.log(`✅ Article récupéré: "${fields.Title}"`);
    console.log(`📊 Statut: ${fields.Status}`);
    
    // 2. Traitement des images
    console.log('\n🖼️  Traitement des images...');
    let content = fields.Content;
    
    const imageReplacements = {
      '{{Image 1 URL}}': fields['Image 1 URL'],
      '{{Image 2 URL}}': fields['Image 2 URL'],
      '{{Image 3 URL}}': fields['Image 3 URL'],
      '{{Image 4 URL}}': fields['Image 4 URL'],
      '{{Image 5 URL}}': fields['Image 5 URL'],
      '{{Image 6 URL}}': fields['Image 6 URL']
    };

    // Remplacer les placeholders
    Object.entries(imageReplacements).forEach(([placeholder, url]) => {
      if (url) {
        content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), url);
        console.log(`   ✅ ${placeholder} → ${url.substring(0, 50)}...`);
      }
    });
    
    // 3. Génération du front matter
    console.log('\n📝 Génération du fichier Markdown...');
    const frontMatter = {
      title: fields.Title,
      description: fields.Description,
      slug: fields.Slug,
      date: new Date().toISOString().split('T')[0],
      author: fields.Author,
      category: fields.Category,
      readTime: fields['Read Time'],
      image: fields['Image 1 URL']
    };

    const yamlFrontMatter = Object.entries(frontMatter)
      .map(([key, value]) => `${key}: "${value}"`)
      .join('\n');
    
    const finalContent = `---\n${yamlFrontMatter}\n---\n\n${content}`;
    
    // 4. Sauvegarde du fichier
    if (!fs.existsSync(BLOG_CONTENT_DIR)) {
      fs.mkdirSync(BLOG_CONTENT_DIR, { recursive: true });
    }
    
    const filePath = path.join(BLOG_CONTENT_DIR, `${fields.Slug}.md`);
    fs.writeFileSync(filePath, finalContent, 'utf8');
    
    console.log(`✅ Fichier sauvegardé: ${filePath}`);
    
    // 5. Mise à jour du statut dans Airtable
    console.log('\n🔄 Mise à jour du statut...');
    const updateCommand = `curl -X PATCH -H "Authorization: Bearer ${AIRTABLE_API_KEY}" -H "Content-Type: application/json" -d '{"fields":{"Status":"Published","Published":true,"Publication Date":"${new Date().toISOString().split('T')[0]}"}}' "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blog%20Articles/recjoyJflRwerlwmT"`;
    
    const { stdout: updateStdout } = await execAsync(updateCommand);
    console.log('✅ Statut mis à jour dans Airtable');
    
    // 6. Vérification du fichier généré
    console.log('\n📊 Vérification du fichier généré:');
    const generatedContent = fs.readFileSync(filePath, 'utf8');
    const imageCount = (generatedContent.match(/!\[.*?\]\(https:\/\/images\.unsplash\.com/g) || []).length;
    
    console.log(`   📝 Taille du fichier: ${generatedContent.length} caractères`);
    console.log(`   🖼️  Images intégrées: ${imageCount}/6`);
    console.log(`   📄 Slug: ${fields.Slug}`);
    
    console.log('\n🎉 Publication réussie !');
    console.log(`📁 Fichier créé: content/blog/${fields.Slug}.md`);
    console.log(`🔗 URL future: https://velocit-ai.fr/blog/${fields.Slug}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testPublish();