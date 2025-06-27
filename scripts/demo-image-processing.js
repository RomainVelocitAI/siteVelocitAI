#!/usr/bin/env node

/**
 * Démonstration du traitement des images dans les articles de blog
 * Montre comment le script remplace {{Image X URL}} par les vraies URLs
 */

const AIRTABLE_API_KEY = 'patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741';
const AIRTABLE_BASE_ID = 'appBsMKnq8zWDIMNr';

async function demonstrateImageProcessing() {
  try {
    console.log('🎨 Démonstration du Traitement des Images\n');
    
    // Simuler la récupération d'un article depuis Airtable
    const { exec } = require('child_process');
    
    const command = `curl -H "Authorization: Bearer ${AIRTABLE_API_KEY}" "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blog%20Articles/recCYkjW29tQdIv3h"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Erreur:', error);
        return;
      }
      
      try {
        const data = JSON.parse(stdout);
        const fields = data.fields;
        
        console.log('📄 Article récupéré:', fields.Title);
        console.log('🔄 Traitement des images...\n');
        
        // Contenu original avec placeholders
        let content = fields.Content;
        console.log('📝 AVANT - Contenu avec placeholders:');
        console.log('─'.repeat(50));
        console.log(content.substring(0, 300) + '...\n');
        
        // Traitement des images (comme le fait le script auto-publish-blog.js)
        const imageReplacements = {
          '{{Image 1 URL}}': fields['Image 1 URL'],
          '{{Image 2 URL}}': fields['Image 2 URL'],
          '{{Image 3 URL}}': fields['Image 3 URL'],
          '{{Image 4 URL}}': fields['Image 4 URL'],
          '{{Image 5 URL}}': fields['Image 5 URL'],
          '{{Image 6 URL}}': fields['Image 6 URL']
        };
        
        console.log('🔗 URLs des images récupérées:');
        Object.entries(imageReplacements).forEach(([placeholder, url]) => {
          console.log(`   ${placeholder} → ${url}`);
        });
        console.log('');
        
        // Remplacement des placeholders
        Object.entries(imageReplacements).forEach(([placeholder, url]) => {
          if (url) {
            content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), url);
          }
        });
        
        console.log('✅ APRÈS - Contenu avec vraies URLs:');
        console.log('─'.repeat(50));
        console.log(content.substring(0, 500) + '...\n');
        
        // Afficher les sections avec images
        console.log('🖼️  Images intégrées dans l\'article:');
        const imageMatches = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
        if (imageMatches) {
          imageMatches.forEach((match, index) => {
            const altMatch = match.match(/!\[([^\]]*)\]/);
            const urlMatch = match.match(/\(([^)]+)\)/);
            console.log(`   ${index + 1}. Alt: "${altMatch[1]}"`);
            console.log(`      URL: ${urlMatch[1]}`);
          });
        }
        
        console.log('\n📊 Statistiques:');
        console.log(`   📝 Longueur du contenu: ${content.length} caractères`);
        console.log(`   🖼️  Images trouvées: ${imageMatches ? imageMatches.length : 0}/6`);
        console.log(`   ⏱️  Temps de lecture: ${fields['Read Time']} minutes`);
        
        console.log('\n🎯 Comment ça marche:');
        console.log('1. L\'agent IA écrit le contenu avec {{Image X URL}}');
        console.log('2. L\'agent IA remplit les champs Image 1-6 URL dans Airtable');
        console.log('3. Le script auto-publish-blog.js remplace les placeholders');
        console.log('4. Le fichier Markdown final contient les vraies URLs');
        console.log('5. Next.js affiche les images dans l\'article publié');
        
        console.log('\n🚀 Prêt pour publication!');
        
      } catch (parseError) {
        console.error('❌ Erreur parsing:', parseError);
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

demonstrateImageProcessing();