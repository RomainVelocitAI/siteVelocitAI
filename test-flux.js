#!/usr/bin/env node

/**
 * Test rapide de Flux 1.1 Pro pour VelocitAI
 * Usage: node test-flux.js
 */

import Replicate from "replicate";
import { writeFile } from "node:fs/promises";

// Configuration du token (utiliser la variable d'environnement en production)
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN || "r8_IcZ***************************amSF5";

async function testFlux() {
    console.log("🧪 Test de Flux 1.1 Pro pour VelocitAI\n");
    
    try {
        const replicate = new Replicate({
            auth: REPLICATE_TOKEN
        });
        
        console.log("⏳ Génération d'une image de test...");
        
        const input = {
            prompt: "Modern French office with business team working on computers, professional environment, blue and white colors, no text",
            aspect_ratio: "1:1",
            output_format: "webp",
            output_quality: 90,
            prompt_upsampling: true,
            safety_tolerance: 2
        };
        
        const output = await replicate.run("black-forest-labs/flux-1.1-pro", { input });
        
        const filename = `test-flux-${Date.now()}.webp`;
        await writeFile(filename, output);
        
        console.log(`✅ Test réussi ! Image générée : ${filename}`);
        console.log(`📁 Taille du fichier : ${(await import('fs')).statSync(filename).size} bytes`);
        console.log(`🎯 Prêt pour la génération d'articles VelocitAI !`);
        
    } catch (error) {
        console.error("❌ Erreur lors du test :", error.message);
        
        if (error.message.includes("authentication")) {
            console.log("💡 Vérifiez votre token Replicate");
        } else if (error.message.includes("billing")) {
            console.log("💡 Vérifiez votre facturation Replicate");
        } else {
            console.log("💡 Vérifiez votre connexion internet et les dépendances");
        }
        
        process.exit(1);
    }
}

testFlux();