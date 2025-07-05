#!/usr/bin/env node

/**
 * Script d'automatisation pour la publication d'articles de blog
 * Se déclenche quotidiennement pour vérifier et publier les articles programmés
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appBsMKnq8zWDIMNr';
const AIRTABLE_TABLE_NAME = 'Blog Articles';

// Configuration
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'content/blog');
const SITEMAP_PATH = path.join(process.cwd(), 'pages/sitemap.xml.tsx');

class BlogAutomation {
  constructor() {
    this.baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    this.headers = {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Récupère le prochain article à publier (publication séquentielle)
   */
  async getNextArticleToPublish() {
    try {
      // Essayer d'abord sans filtre pour voir si la table existe
      console.log('🔍 Test de connexion à la table...');
      const testUrl = `${this.baseUrl}?maxRecords=1`;
      
      const testResponse = await fetch(testUrl, {
        method: 'GET',
        headers: this.headers,
        timeout: 30000
      });

      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.error('❌ Erreur test connexion:', testResponse.status, errorText);
        throw new Error(`Erreur test connexion Airtable: ${testResponse.status} ${testResponse.statusText}`);
      }

      console.log('✅ Table accessible, application du filtre...');
      
      // Essayer avec une formule plus simple
      const filterFormula = `{Status} = 'Scheduled'`;
      const encodedFormula = encodeURIComponent(filterFormula);
      const url = `${this.baseUrl}?filterByFormula=${encodedFormula}&maxRecords=5`;
      
      console.log('🔗 URL avec filtre:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
        timeout: 30000
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur avec filtre:', testResponse.status, errorText);
        throw new Error(`Erreur Airtable: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`📊 Trouvé ${data.records.length} article(s) avec statut 'Scheduled'`);
      
      // Filtrer les articles non publiés côté client
      const unpublishedArticles = data.records.filter(record => 
        !record.fields.Published || record.fields.Published === false
      );
      
      console.log(`📝 Articles non publiés: ${unpublishedArticles.length}`);
      return unpublishedArticles.slice(0, 1); // Retourner le premier
      
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw error;
    }
  }

  /**
   * Récupère les articles programmés pour aujourd'hui (méthode alternative)
   */
  async getScheduledArticles() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Filtre pour les articles programmés pour aujourd'hui et non encore publiés
      const filterFormula = `AND(
        {Publication Date} = '${today}',
        {Status} = 'Scheduled',
        {Published} = FALSE()
      )`;

      const url = `${this.baseUrl}?filterByFormula=${encodeURIComponent(filterFormula)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`Erreur Airtable: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      throw error;
    }
  }

  /**
   * Génère le contenu Markdown à partir des données Airtable
   */
  generateMarkdownContent(record) {
    const fields = record.fields;
    
    // Traitement des images - remplacer les placeholders par les vraies URLs
    let content = fields.Content;
    const imageReplacements = {
      '{{Image 1 URL}}': fields['Image 1 URL'],
      '{{Image 2 URL}}': fields['Image 2 URL'],
      '{{Image 3 URL}}': fields['Image 3 URL'],
      '{{Image 4 URL}}': fields['Image 4 URL'],
      '{{Image 5 URL}}': fields['Image 5 URL'],
      '{{Image 6 URL}}': fields['Image 6 URL']
    };

    // Remplacer tous les placeholders par les vraies URLs
    Object.entries(imageReplacements).forEach(([placeholder, url]) => {
      if (url) {
        content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), url);
      }
    });
    
    // Génération du front matter
    const frontMatter = {
      title: fields.Title,
      description: fields.Description,
      slug: fields.Slug || this.generateSlug(fields.Title),
      date: fields['Publication Date'] || new Date().toISOString().split('T')[0],
      author: fields.Author || 'VelocitAI',
      category: fields.Category,
      tags: fields.Tags || [],
      image: fields['Image 1 URL'], // Utiliser la première image comme image principale
      readTime: fields['Read Time'] || this.estimateReadTime(content),
      featured: fields.Featured || false,
      seo: {
        metaTitle: fields['SEO Title'] || fields.Title,
        metaDescription: fields['SEO Description'] || fields.Description,
        keywords: fields['SEO Keywords'] || []
      }
    };

    // Construction du fichier Markdown avec les images traitées
    const yamlFrontMatter = this.objectToYaml(frontMatter);
    const finalContent = `---\n${yamlFrontMatter}---\n\n${content}`;
    
    return {
      content: finalContent,
      slug: frontMatter.slug,
      frontMatter
    };
  }

  /**
   * Génère un slug à partir du titre
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Supprime les tirets multiples
      .trim('-');
  }

  /**
   * Estime le temps de lecture
   */
  estimateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Convertit un objet en YAML
   */
  objectToYaml(obj, indent = 0) {
    let yaml = '';
    const spaces = '  '.repeat(indent);
    
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) continue;
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        yaml += `${spaces}${key}:\n`;
        yaml += this.objectToYaml(value, indent + 1);
      } else if (Array.isArray(value)) {
        yaml += `${spaces}${key}:\n`;
        value.forEach(item => {
          yaml += `${spaces}  - "${item}"\n`;
        });
      } else if (typeof value === 'string') {
        yaml += `${spaces}${key}: "${value}"\n`;
      } else {
        yaml += `${spaces}${key}: ${value}\n`;
      }
    }
    
    return yaml;
  }

  /**
   * Sauvegarde l'article en fichier Markdown
   */
  async saveArticle(articleData) {
    try {
      const filePath = path.join(BLOG_CONTENT_DIR, `${articleData.slug}.md`);
      
      // Vérifier si le répertoire existe
      if (!fs.existsSync(BLOG_CONTENT_DIR)) {
        fs.mkdirSync(BLOG_CONTENT_DIR, { recursive: true });
        console.log(`📁 Répertoire créé: ${BLOG_CONTENT_DIR}`);
      }

      // Écrire le fichier
      fs.writeFileSync(filePath, articleData.content, 'utf8');
      
      console.log(`✅ Article sauvegardé: ${filePath}`);
      
      // Vérifier que le fichier existe bien
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`📊 Fichier créé: ${stats.size} bytes`);
        
        // Debug git pour voir si le fichier est détecté
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        
        try {
          const { stdout: gitStatus } = await execAsync('git status --porcelain');
          console.log('📋 Git status après création:');
          console.log(gitStatus || 'Aucun changement détecté par git');
          
          // Ajouter explicitement le fichier
          await execAsync(`git add "${filePath}"`);
          console.log(`➕ Fichier ajouté à git: ${filePath}`);
          
          const { stdout: gitStatusAfter } = await execAsync('git status --porcelain');
          console.log('📋 Git status après add:');
          console.log(gitStatusAfter || 'Aucun changement en staging');
          
        } catch (gitError) {
          console.error('⚠️ Erreur git debug:', gitError.message);
        }
      }
      
      return filePath;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  }

  /**
   * Met à jour le statut dans Airtable
   */
  async updateArticleStatus(recordId, published = true) {
    try {
      const url = `${this.baseUrl}/${recordId}`;
      const today = new Date().toISOString().split('T')[0];
      
      const updateFields = {
        Published: published,
        Status: published ? 'Published' : 'Draft'
      };

      // Si on publie, mettre à jour la date de publication
      if (published) {
        updateFields['Publication Date'] = today;
      }
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ fields: updateFields }),
        timeout: 30000
      });

      if (!response.ok) {
        throw new Error(`Erreur Airtable: ${response.status} ${response.statusText}`);
      }

      console.log(`✅ Statut mis à jour dans Airtable pour l'enregistrement ${recordId}`);
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      throw error;
    }
  }

  /**
   * Met à jour le sitemap dynamiquement
   */
  async updateSitemap() {
    try {
      // Lire tous les articles existants
      const articles = [];
      
      if (fs.existsSync(BLOG_CONTENT_DIR)) {
        const files = fs.readdirSync(BLOG_CONTENT_DIR);
        
        for (const file of files) {
          if (file.endsWith('.md')) {
            const filePath = path.join(BLOG_CONTENT_DIR, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const matter = this.parseFrontMatter(content);
            
            if (matter.frontMatter) {
              articles.push({
                slug: matter.frontMatter.slug || file.replace('.md', ''),
                date: matter.frontMatter.date,
                priority: matter.frontMatter.featured ? '0.8' : '0.7'
              });
            }
          }
        }
      }

      // Générer le nouveau sitemap
      const sitemapContent = this.generateSitemapContent(articles);
      fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
      
      console.log('✅ Sitemap mis à jour');
    } catch (error) {
      console.error('Erreur mise à jour sitemap:', error);
      throw error;
    }
  }

  /**
   * Parse le front matter d'un fichier Markdown
   */
  parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      return { frontMatter: null, content };
    }

    try {
      // Parsing YAML amélioré
      const frontMatterText = match[1];
      const frontMatter = {};
      
      frontMatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();
          
          // Nettoyer les guillemets
          value = value.replace(/^["']|["']$/g, '');
          
          // Gérer les cas spéciaux
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          if (!isNaN(value) && value !== '') value = Number(value);
          
          frontMatter[key] = value;
        }
      });

      // S'assurer qu'on a au minimum un slug
      if (!frontMatter.slug && frontMatter.title) {
        frontMatter.slug = this.generateSlug(frontMatter.title);
      }

      return {
        frontMatter,
        content: match[2]
      };
    } catch (error) {
      console.error('Erreur parsing front matter:', error);
      return { frontMatter: null, content };
    }
  }

  /**
   * Génère le contenu du sitemap
   */
  generateSitemapContent(articles) {
    const baseUrl = 'https://velocitai.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemapUrls = `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Ajouter les articles
    articles.forEach(article => {
      sitemapUrls += `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${article.priority}</priority>
  </url>`;
    });

    return `import { GetServerSideProps } from 'next';

const Sitemap = () => {
  // This component will never be rendered
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>\`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;`;
  }

  /**
   * Vérifie si c'est un jour de publication (tous les 2 jours)
   */
  shouldPublishToday() {
    const today = new Date();
    const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    
    // Publication tous les 2 jours (jours pairs depuis l'époque)
    return daysSinceEpoch % 2 === 0;
  }

  /**
   * Processus principal d'automatisation - Publication tous les 2 jours
   */
  async run() {
    try {
      console.log('🚀 Démarrage de l\'automatisation blog (publication tous les 2 jours)...');
      
      // Vérifier les variables d'environnement
      if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        throw new Error('Variables d\'environnement Airtable manquantes');
      }
      
      // Debug des variables d'environnement (masqué)
      console.log('🔐 API Key présente:', AIRTABLE_API_KEY ? `${AIRTABLE_API_KEY.substring(0, 6)}...` : 'NON');
      console.log('🔐 Base ID présente:', AIRTABLE_BASE_ID ? `${AIRTABLE_BASE_ID.substring(0, 6)}...` : 'NON');

      // Vérifier si c'est un jour de publication
      if (!this.shouldPublishToday()) {
        console.log('📅 Pas de publication aujourd\'hui (cycle de 2 jours)');
        console.log('🔄 Prochaine publication demain');
        return;
      }

      console.log('📅 Jour de publication ! Recherche d\'un article à publier...');

      // Récupérer le prochain article à publier
      const nextArticles = await this.getNextArticleToPublish();
      
      if (nextArticles.length === 0) {
        console.log('ℹ️  Aucun article en attente de publication');
        console.log('💡 Ajoutez des articles avec le statut "Scheduled" dans Airtable');
        return;
      }

      console.log(`📝 Publication du prochain article en file d'attente`);
      await this.processArticles(nextArticles);
      
    } catch (error) {
      console.error('❌ Erreur dans l\'automatisation:', error);
      process.exit(1);
    }
  }

  /**
   * Traite une liste d'articles pour publication
   */
  async processArticles(articles) {
    for (const record of articles) {
      try {
        console.log(`\n📄 Traitement: ${record.fields.Title}`);
        
        // Générer le contenu Markdown
        const articleData = this.generateMarkdownContent(record);
        
        // Sauvegarder l'article
        await this.saveArticle(articleData);
        
        // Mettre à jour le statut dans Airtable avec la date du jour
        await this.updateArticleStatus(record.id, true);
        
        console.log(`✅ Article publié: ${articleData.slug}`);
        
      } catch (error) {
        console.error(`❌ Erreur pour l'article ${record.fields.Title}:`, error);
        // Continuer avec les autres articles
      }
    }

    // Mettre à jour le sitemap (temporairement désactivé)
    // await this.updateSitemap();
    
    console.log('\n🎉 Automatisation terminée avec succès!');
  }
}

// Exécution du script
if (require.main === module) {
  const automation = new BlogAutomation();
  automation.run();
}

module.exports = BlogAutomation;