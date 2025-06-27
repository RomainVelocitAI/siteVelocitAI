#!/usr/bin/env node

/**
 * Script simple pour tester la connexion Airtable et afficher les articles
 */

const AIRTABLE_API_KEY = 'patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741';
const AIRTABLE_BASE_ID = 'appBsMKnq8zWDIMNr';

async function testConnection() {
  try {
    console.log('🔍 Test de connexion à Airtable...\n');
    
    // Test avec curl via child_process
    const { exec } = require('child_process');
    
    const command = `curl -H "Authorization: Bearer ${AIRTABLE_API_KEY}" "https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Blog%20Articles"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Erreur:', error);
        return;
      }
      
      if (stderr) {
        console.error('❌ Stderr:', stderr);
        return;
      }
      
      try {
        const data = JSON.parse(stdout);
        console.log('✅ Connexion réussie !');
        console.log(`📊 ${data.records.length} article(s) trouvé(s):\n`);
        
        data.records.forEach((record, index) => {
          const fields = record.fields;
          console.log(`${index + 1}. 📄 ${fields.Title}`);
          console.log(`   📅 Statut: ${fields.Status || 'Non défini'}`);
          console.log(`   👤 Auteur: ${fields.Author || 'Non défini'}`);
          console.log(`   🏷️  Catégorie: ${fields.Category || 'Non définie'}`);
          console.log(`   ⏱️  Temps de lecture: ${fields['Read Time'] || 'Non défini'} min`);
          console.log(`   🖼️  Images: ${[
            fields['Image 1 URL'],
            fields['Image 2 URL'],
            fields['Image 3 URL'],
            fields['Image 4 URL'],
            fields['Image 5 URL'],
            fields['Image 6 URL']
          ].filter(Boolean).length}/6`);
          console.log('');
        });
        
        console.log('🎉 Base Airtable "Blog" configurée correctement !');
        console.log('📋 Structure:');
        console.log('   - Table: Blog Articles');
        console.log('   - Champs principaux: Title, Description, Content, Slug');
        console.log('   - Champs de publication: Status, Published, Publication Date');
        console.log('   - Champs métadonnées: Author, Category, Read Time');
        console.log('   - Champs images: 6 URLs d\'images (Image 1-6 URL)');
        
      } catch (parseError) {
        console.error('❌ Erreur parsing JSON:', parseError);
        console.log('Raw output:', stdout);
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

testConnection();