import { GetServerSideProps } from 'next';

const Sitemap = () => {
  // This component will never be rendered
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://velocitai.com/</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/5-etapes-automatiser-processus-entreprise</loc>
    <lastmod>2024-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/chatbot-ia-service-client-2024</loc>
    <lastmod>2024-06-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/roi-automatisation-entreprise-calcul</loc>
    <lastmod>2024-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;