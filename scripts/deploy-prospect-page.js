#!/usr/bin/env node

/**
 * Script de déploiement automatique des pages prospects
 * Utilisé par n8n pour pousser les nouvelles pages vers GitHub
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const config = {
  gitBranch: process.env.GIT_BRANCH || 'main',
  gitRemote: process.env.GIT_REMOTE || 'origin',
  enablePush: process.env.ENABLE_GIT_PUSH === 'true',
  triggerDeploy: process.env.TRIGGER_DEPLOY === 'true',
  webhookUrl: process.env.DEPLOY_WEBHOOK_URL,
};

// Fonction utilitaire pour logger avec timestamp
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

// Fonction pour vérifier le statut Git
async function checkGitStatus() {
  try {
    const { stdout } = await execAsync('git status --porcelain');
    return stdout.trim().split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    throw new Error(`Failed to check git status: ${error.message}`);
  }
}

// Fonction pour ajouter les fichiers modifiés
async function addFiles(files) {
  try {
    const filesList = files.join(' ');
    await execAsync(`git add ${filesList}`);
    log(`Added files: ${filesList}`);
  } catch (error) {
    throw new Error(`Failed to add files: ${error.message}`);
  }
}

// Fonction pour créer un commit
async function createCommit(message) {
  try {
    await execAsync(`git commit -m "${message}"`);
    log(`Created commit: ${message}`);
  } catch (error) {
    throw new Error(`Failed to create commit: ${error.message}`);
  }
}

// Fonction pour pousser vers GitHub
async function pushToGitHub() {
  try {
    await execAsync(`git push ${config.gitRemote} ${config.gitBranch}`);
    log(`Pushed to ${config.gitRemote}/${config.gitBranch}`);
  } catch (error) {
    throw new Error(`Failed to push to GitHub: ${error.message}`);
  }
}

// Fonction pour déclencher le déploiement via webhook
async function triggerDeployment() {
  if (!config.webhookUrl) {
    log('No webhook URL configured, skipping deployment trigger');
    return;
  }

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deploy',
        source: 'prospect-page-generator',
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      log('Deployment triggered successfully');
    } else {
      throw new Error(`Webhook returned status ${response.status}`);
    }
  } catch (error) {
    log(`Failed to trigger deployment: ${error.message}`, 'WARN');
  }
}

// Fonction principale
async function deployProspectPage(prospectData) {
  try {
    log('Starting prospect page deployment process');

    // Vérifier le statut Git
    const modifiedFiles = await checkGitStatus();
    
    if (modifiedFiles.length === 0) {
      log('No files to commit');
      return {
        success: true,
        message: 'No changes to deploy',
        files: [],
      };
    }

    log(`Found ${modifiedFiles.length} modified files`);

    // Filtrer les fichiers de prospects
    const prospectFiles = modifiedFiles.filter(file => 
      file.includes('/prospect/') || 
      file.includes('data/prospects/')
    );

    if (prospectFiles.length === 0) {
      log('No prospect-related files to deploy');
      return {
        success: true,
        message: 'No prospect files to deploy',
        files: [],
      };
    }

    // Ajouter les fichiers
    await addFiles(prospectFiles.map(file => file.replace(/^[AM]\s+/, '')));

    // Créer le message de commit
    const companyName = prospectData?.companyName || 'Unknown Company';
    const commitMessage = `feat: add prospect page for ${companyName}

- Generated personalized landing page
- Added prospect data file
- Source: automated n8n workflow

[skip ci]`;

    // Créer le commit
    await createCommit(commitMessage);

    // Pousser vers GitHub si activé
    if (config.enablePush) {
      await pushToGitHub();
    } else {
      log('Git push disabled, commit created locally only');
    }

    // Déclencher le déploiement si activé
    if (config.triggerDeploy) {
      await triggerDeployment();
    }

    log('Deployment process completed successfully');

    return {
      success: true,
      message: 'Prospect page deployed successfully',
      files: prospectFiles,
      commit: {
        message: commitMessage,
        pushed: config.enablePush,
      },
    };

  } catch (error) {
    log(`Deployment failed: ${error.message}`, 'ERROR');
    
    return {
      success: false,
      error: error.message,
      files: [],
    };
  }
}

// Interface en ligne de commande
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: node deploy-prospect-page.js [options]

Options:
  --data <json>     Prospect data as JSON string
  --file <path>     Path to JSON file containing prospect data
  --help           Show this help message

Environment Variables:
  GIT_BRANCH           Git branch to push to (default: main)
  GIT_REMOTE           Git remote name (default: origin)
  ENABLE_GIT_PUSH      Enable pushing to GitHub (default: false)
  TRIGGER_DEPLOY       Trigger deployment webhook (default: false)
  DEPLOY_WEBHOOK_URL   Webhook URL for deployment trigger

Examples:
  node deploy-prospect-page.js --data '{"companyName":"Test Company"}'
  node deploy-prospect-page.js --file ./prospect-data.json
`);
    process.exit(0);
  }

  let prospectData = {};

  // Parser les arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--data':
        if (i + 1 < args.length) {
          try {
            prospectData = JSON.parse(args[i + 1]);
          } catch (error) {
            console.error('Invalid JSON in --data argument');
            process.exit(1);
          }
        }
        break;
      
      case '--file':
        if (i + 1 < args.length) {
          try {
            const filePath = path.resolve(args[i + 1]);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            prospectData = JSON.parse(fileContent);
          } catch (error) {
            console.error(`Failed to read file: ${error.message}`);
            process.exit(1);
          }
        }
        break;
      
      case '--help':
        // Help message already shown above
        process.exit(0);
    }
  }

  // Exécuter le déploiement
  const result = await deployProspectPage(prospectData);
  
  if (result.success) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } else {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

// Exporter pour utilisation comme module
module.exports = {
  deployProspectPage,
  config,
};

// Exécuter si appelé directement
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}