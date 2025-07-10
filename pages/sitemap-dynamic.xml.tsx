import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Sitemap = () => {
  // This component will never be rendered
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://velocit-ai.fr';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Récupérer tous les articles de blog
  const blogArticles = [];
  const blogDir = path.join(process.cwd(), 'content/blog');
  
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        try {
          const filePath = path.join(blogDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContent);
          
          blogArticles.push({
            slug: data.slug || file.replace('.md', ''),
            date: data.date || currentDate,
            priority: data.featured ? '0.8' : '0.7'
          });
        } catch (error) {
          console.error(`Erreur lecture article ${file}:`, error);
        }
      }
    }
  }
  
  // Générer le sitemap dynamiquement
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

  // Ajouter les articles de blog
  blogArticles.forEach(article => {
    sitemapUrls += `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${article.priority}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;