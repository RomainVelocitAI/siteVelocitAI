/**
 * Script direct pour générer les images avec l'API Replicate
 * Usage: node scripts/generate-images-direct.js
 */

const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

// Prompts pour les 6 images
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

// Function to download image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
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
    }).on('error', reject);
  });
}

// Generate single image
async function generateImage(prompt, filename, alt) {
  try {
    console.log(`📸 Generating: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);
    
    const output = await replicate.run("black-forest-labs/flux-1.1-pro:80a09d66baa990429c2f5ae8a4306bf778a1b3775afd01cc2cc8bdbe9033769c", {
      input: {
        prompt: prompt,
        aspect_ratio: "4:3",
        output_format: "png",
        output_quality: 90,
        prompt_upsampling: true
      }
    });

    if (!output) {
      throw new Error('No output generated');
    }

    const imageUrl = typeof output === 'string' ? output : output[0];
    console.log(`🔗 Image URL: ${imageUrl}`);
    
    // Create directory if not exists
    const dir = path.join(__dirname, '..', 'public', 'images', 'blog', 'chatbots-ia-service-client-2025');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Download and save image
    const filepath = path.join(dir, filename);
    await downloadImage(imageUrl, filepath);
    
    console.log(`✅ Saved: ${filename}\n`);
    return {
      filename,
      alt,
      prompt,
      localPath: `/images/blog/chatbots-ia-service-client-2025/${filename}`,
      success: true
    };
    
  } catch (error) {
    console.error(`❌ Error with ${filename}:`, error.message);
    return {
      filename,
      alt,
      prompt,
      error: error.message,
      success: false
    };
  }
}

// Main function
async function generateAllImages() {
  console.log('🎨 Starting direct image generation with Replicate API...\n');
  
  const results = [];
  
  for (let i = 0; i < imagePrompts.length; i++) {
    const { filename, prompt, alt } = imagePrompts[i];
    
    const result = await generateImage(prompt, filename, alt);
    results.push(result);
    
    // Wait between requests to respect rate limits
    if (i < imagePrompts.length - 1) {
      console.log('⏳ Waiting 3 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Generate summary
  const successful = results.filter(r => r.success);
  console.log('\n📊 Generation Summary:');
  console.log(`✅ Successfully generated: ${successful.length}/${results.length} images`);
  
  if (successful.length > 0) {
    console.log('\n📁 Generated files:');
    successful.forEach(result => {
      console.log(`  - ${result.filename}`);
    });
  }
  
  // Save metadata
  const metadata = {
    article: 'chatbots-ia-service-client-2025',
    generated: new Date().toISOString(),
    images: results.map(r => ({
      filename: r.filename,
      alt: r.alt,
      prompt: r.prompt,
      success: r.success,
      localPath: r.localPath,
      error: r.error
    }))
  };
  
  const metadataPath = path.join(__dirname, '..', 'public', 'images', 'blog', 'chatbots-ia-service-client-2025', 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log('\n💾 Metadata saved');
  
  console.log('\n🎉 Image generation completed!');
  return results;
}

// Run if called directly
if (require.main === module) {
  generateAllImages().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { generateAllImages, imagePrompts };