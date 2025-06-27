/**
 * Script pour générer les images de l'article de blog avec l'API Replicate
 * Usage: node scripts/generate-blog-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Prompts pour les 6 images de l'article
const imagePrompts = [
  {
    filename: 'chatbot-interface-moderne.png',
    prompt: 'Modern AI chatbot interface on smartphone screen, sleek blue and white design, professional business setting, chat bubbles with friendly conversation, clean UI elements, high quality digital art, professional photography style',
    alt: 'Interface moderne de chatbot IA sur smartphone montrant une conversation professionnelle'
  },
  {
    filename: 'service-client-automatise.png', 
    prompt: 'Professional customer service representative with headset working alongside holographic AI assistant, modern office environment, blue and purple lighting, futuristic technology, professional business photography',
    alt: 'Représentation du service client automatisé avec IA et agent humain travaillant ensemble'
  },
  {
    filename: 'statistiques-roi-chatbot.png',
    prompt: 'Clean business dashboard showing ROI statistics and performance metrics, charts and graphs with upward trends, blue and green color scheme, professional data visualization, modern flat design',
    alt: 'Dashboard montrant les statistiques de ROI et performances d\'un chatbot IA'
  },
  {
    filename: 'integration-multicanale.png',
    prompt: 'Multiple communication channels converging into single AI system, WhatsApp, website, email, social media icons connected by flowing lines, modern tech illustration, blue gradient background',
    alt: 'Illustration de l\'intégration multicanale d\'un chatbot sur différentes plateformes'
  },
  {
    filename: 'equipe-formation-chatbot.png',
    prompt: 'Diverse business team in training session, laptops open, collaborative workshop environment, modern office space, people engaged in learning, professional corporate photography',
    alt: 'Équipe en formation pour l\'implémentation d\'un chatbot IA en entreprise'
  },
  {
    filename: 'chatbot-secteurs-activite.png',
    prompt: 'Various business sectors illustrated with modern icons - healthcare, retail, finance, hospitality, connected by AI neural network pattern, professional business illustration, clean design',
    alt: 'Différents secteurs d\'activité utilisant des chatbots IA représentés par des icônes modernes'
  }
];

// Function to download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to call Replicate API
async function generateImage(prompt, filename) {
  try {
    const response = await fetch('http://localhost:3000/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        filename: filename
      })
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate image');
    }

    console.log(`✅ Generated and saved: ${filename}`);
    return {
      filename: data.filename,
      localPath: data.localPath,
      tempUrl: data.imageUrl,
      prompt: data.prompt
    };
    
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    return null;
  }
}

// Main function
async function generateAllImages() {
  console.log('🎨 Starting image generation for chatbot blog article...\n');
  
  const results = [];
  
  for (let i = 0; i < imagePrompts.length; i++) {
    const { filename, prompt, alt } = imagePrompts[i];
    
    console.log(`📸 Generating image ${i + 1}/6: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);
    
    const result = await generateImage(prompt, filename);
    
    if (result) {
      results.push({
        ...result,
        alt
      });
    }
    
    // Wait 2 seconds between requests to respect API limits
    if (i < imagePrompts.length - 1) {
      console.log('⏳ Waiting 2 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Generate summary
  console.log('\n📊 Generation Summary:');
  console.log(`✅ Successfully generated: ${results.length}/${imagePrompts.length} images`);
  
  if (results.length > 0) {
    console.log('\n📁 Generated files:');
    results.forEach(result => {
      console.log(`  - ${result.filename} (${result.alt})`);
    });
    
    // Save metadata for the blog post
    const metadata = {
      article: 'chatbots-ia-service-client-2025',
      generated: new Date().toISOString(),
      images: results.map(r => ({
        filename: r.filename,
        alt: r.alt,
        prompt: r.prompt
      }))
    };
    
    const metadataPath = path.join(__dirname, '..', 'public', 'images', 'blog', 'chatbots-ia-service-client-2025', 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('\n💾 Metadata saved to metadata.json');
  }
  
  console.log('\n🎉 Image generation completed!');
}

// Run if called directly
if (require.main === module) {
  generateAllImages().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { generateAllImages, imagePrompts };