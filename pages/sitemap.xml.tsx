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
    <lastmod>2025-06-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog</loc>
    <lastmod>2025-06-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/10-processus-automatiser-priorite-entreprise</loc>
    <lastmod>2024-12-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/automatisation-entreprise-guide-strategique-2025</loc>
    <lastmod>2024-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/chatbots-ia-service-client-2025</loc>
    <lastmod>2025-01-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://velocitai.com/blog/n8n-vs-zapier-2025-comparatif-automatisation-pme</loc>
    <lastmod>2025-06-27</lastmod>
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