#!/usr/bin/env node

/**
 * Générateur d'images Flux 1.1 Pro pour articles VelocitAI
 * Usage: node flux-image-generator.js
 * 
 * Prérequis:
 * - npm install replicate
 * - export REPLICATE_API_TOKEN=r8_IcZ***************************amSF5
 */

import Replicate from "replicate";
import { writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";

const replicate = new Replicate();

// Configuration par défaut
const DEFAULT_CONFIG = {
    aspect_ratio: "1:1",
    output_format: "webp",
    output_quality: 90,
    prompt_upsampling: true,
    safety_tolerance: 2
};

// Prompts prédéfinis pour articles VelocitAI
const PRESET_PROMPTS = {
    "infographie-ia": "Modern business infographic showing artificial intelligence in enterprise, professional French style, blue and white colors, clean design, no text",
    "bureau-moderne": "Modern French office with team working on AI technology, collaborative atmosphere, professional environment, no text",
    "graphique-roi": "Professional chart showing ROI of automation technology, progress bars and percentages, business dashboard style, no text",
    "interface-chatbot": "Modern chatbot interface on computer screen, professional design, clean UI, conversation bubbles, no text",
    "processus-automatisation": "Business process visualization with connected gears and workflow, professional schematic style, no text",
    "dirigeant-analyse": "French business executive analyzing data on tablet, modern office, confident professional, no text",
    "transformation-digitale": "Digital transformation roadmap visualization, timeline with steps, modern infographic style, no text",
    "equipe-formation": "French PME team in training session on new technologies, modern training room, collaborative learning, no text",
    "securite-rgpd": "Data security and GDPR compliance symbols, shields and locks, professional legal style, no text",
    "croissance-entreprise": "Business growth chart with ascending curves, performance indicators, professional dashboard style, no text"
};

/**
 * Génère une image avec Flux 1.1 Pro
 */
async function generateImage(prompt, filename, config = {}) {
    try {
        console.log(`🎨 Génération de l'image: ${filename}`);
        console.log(`📝 Prompt: ${prompt}`);
        
        const input = {
            prompt: prompt + ", no text, professional style",
            ...DEFAULT_CONFIG,
            ...config
        };
        
        console.log(`⏳ Envoi de la requête à Flux 1.1 Pro...`);
        const output = await replicate.run("black-forest-labs/flux-1.1-pro", { input });
        
        // Créer le dossier de sortie si nécessaire
        const outputDir = "generated-images";
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }
        
        const filepath = `${outputDir}/${filename}`;
        await writeFile(filepath, output);
        
        console.log(`✅ Image générée avec succès: ${filepath}`);
        return filepath;
        
    } catch (error) {
        console.error(`❌ Erreur lors de la génération de ${filename}:`, error.message);
        throw error;
    }
}

/**
 * Génère un set complet d'images pour un article
 */
async function generateArticleImages(articleTheme, customPrompts = []) {
    console.log(`🚀 Génération d'images pour l'article: ${articleTheme}`);
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    const images = [];
    
    try {
        // Utiliser les prompts personnalisés ou les presets
        const prompts = customPrompts.length > 0 ? customPrompts : [
            PRESET_PROMPTS["infographie-ia"],
            PRESET_PROMPTS["bureau-moderne"],
            PRESET_PROMPTS["graphique-roi"],
            PRESET_PROMPTS["interface-chatbot"],
            PRESET_PROMPTS["processus-automatisation"],
            PRESET_PROMPTS["dirigeant-analyse"]
        ];
        
        for (let i = 0; i < Math.min(prompts.length, 6); i++) {
            const filename = `${timestamp}_${articleTheme}_image${i + 1}.webp`;
            const filepath = await generateImage(prompts[i], filename);
            images.push({
                index: i + 1,
                filename,
                filepath,
                prompt: prompts[i]
            });
        }
        
        console.log(`\n🎉 Génération terminée! ${images.length} images créées:`);
        images.forEach(img => {
            console.log(`   Image ${img.index}: ${img.filepath}`);
        });
        
        // Générer le code Airtable
        console.log(`\n📋 URLs pour Airtable:`);
        images.forEach(img => {
            console.log(`"Image ${img.index} URL": "file://${process.cwd()}/${img.filepath}",`);
        });
        
        return images;
        
    } catch (error) {
        console.error(`❌ Erreur lors de la génération des images:`, error.message);
        throw error;
    }
}

/**
 * Interface en ligne de commande
 */
async function main() {
    console.log(`🎨 Générateur d'Images Flux 1.1 Pro - VelocitAI\n`);
    
    // Vérifier le token
    if (!process.env.REPLICATE_API_TOKEN) {
        console.error(`❌ Erreur: REPLICATE_API_TOKEN non configuré`);
        console.log(`💡 Solution: export REPLICATE_API_TOKEN=r8_IcZ***************************amSF5`);
        process.exit(1);
    }
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`📖 Usage:`);
        console.log(`   node flux-image-generator.js <theme-article>`);
        console.log(`   node flux-image-generator.js preset <nom-preset>`);
        console.log(`   node flux-image-generator.js custom "prompt personnalisé" <filename>`);
        console.log(`\n🎯 Presets disponibles:`);
        Object.keys(PRESET_PROMPTS).forEach(key => {
            console.log(`   - ${key}`);
        });
        process.exit(0);
    }
    
    const command = args[0];
    
    try {
        if (command === "preset") {
            const presetName = args[1];
            if (!PRESET_PROMPTS[presetName]) {
                console.error(`❌ Preset "${presetName}" non trouvé`);
                process.exit(1);
            }
            
            const filename = `preset_${presetName}_${Date.now()}.webp`;
            await generateImage(PRESET_PROMPTS[presetName], filename);
            
        } else if (command === "custom") {
            const customPrompt = args[1];
            const filename = args[2] || `custom_${Date.now()}.webp`;
            
            if (!customPrompt) {
                console.error(`❌ Prompt personnalisé requis`);
                process.exit(1);
            }
            
            await generateImage(customPrompt, filename);
            
        } else {
            // Génération complète pour un article
            const articleTheme = command;
            await generateArticleImages(articleTheme);
        }
        
    } catch (error) {
        console.error(`❌ Erreur fatale:`, error.message);
        process.exit(1);
    }
}

// Exporter les fonctions pour usage programmatique
export { generateImage, generateArticleImages, PRESET_PROMPTS };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}