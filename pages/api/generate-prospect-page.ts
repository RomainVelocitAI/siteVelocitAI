import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

// Interface pour les données du prospect
interface ProspectData {
  // Données obligatoires
  prospectName: string;
  companyName: string;
  email: string;
  phone?: string;
  
  // Données optionnelles pour personnalisation
  industry?: string;
  companySize?: string;
  challenges?: string[];
  goals?: string[];
  currentTools?: string[];
  budget?: string;
  timeline?: string;
  
  // Métadonnées
  leadSource?: string;
  leadScore?: number;
  assignedTo?: string;
  
  // Configuration de la page
  customMessage?: string;
  offerType?: 'standard' | 'premium' | 'enterprise';
  ctaText?: string;
  ctaUrl?: string;
}

// Fonction pour générer un slug URL-friendly
function generateSlug(companyName: string): string {
  return companyName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim()
    .replace(/^-|-$/g, ''); // Supprime les tirets en début et fin
}

// Fonction pour générer le contenu du fichier de données JSON
function generateProspectDataFile(data: ProspectData, slug: string): string {
  const prospectData = {
    ...data,
    slug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return JSON.stringify(prospectData, null, 2);
}

// Fonction pour créer le fichier de page Next.js
function generatePageFile(slug: string): string {
  return `import { GetStaticProps } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import ProspectLanding from '../../templates/ProspectLanding';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dataPath = join(process.cwd(), 'data', 'prospects', '${slug}.json');
    const jsonData = readFileSync(dataPath, 'utf8');
    const prospectData = JSON.parse(jsonData);

    return {
      props: prospectData,
      revalidate: 3600, // Revalide chaque heure
    };
  } catch (error) {
    console.error('Error loading prospect data:', error);
    return {
      notFound: true,
    };
  }
};

export default function ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Page(props: any) {
  return <ProspectLanding {...props} />;
}
`;
}

// API handler principal
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérification de l'API key pour sécuriser l'endpoint
  const apiKey = req.headers['x-api-key'] || req.body.apiKey;
  if (!apiKey || apiKey !== process.env.PROSPECT_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const prospectData: ProspectData = req.body;

    // Validation des données obligatoires
    if (!prospectData.prospectName || !prospectData.companyName || !prospectData.email) {
      return res.status(400).json({ 
        error: 'Missing required fields: prospectName, companyName, email' 
      });
    }

    // Génération du slug
    const slug = generateSlug(prospectData.companyName);
    
    // Vérification si la page existe déjà
    const pagePath = path.join(process.cwd(), 'pages', 'prospect', `${slug}.tsx`);
    const dataPath = path.join(process.cwd(), 'data', 'prospects', `${slug}.json`);
    
    if (fs.existsSync(pagePath)) {
      return res.status(409).json({ 
        error: 'Page already exists', 
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/prospect/${slug}` 
      });
    }

    // Création des dossiers si nécessaire
    const dataDir = path.dirname(dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Génération et écriture du fichier de données
    const dataContent = generateProspectDataFile(prospectData, slug);
    fs.writeFileSync(dataPath, dataContent, 'utf8');

    // Génération et écriture du fichier de page
    const pageContent = generatePageFile(slug);
    fs.writeFileSync(pagePath, pageContent, 'utf8');

    // Si activé, commit et push vers GitHub
    if (process.env.AUTO_DEPLOY === 'true') {
      try {
        const commitMessage = `feat: add prospect page for ${prospectData.companyName}`;
        
        await execAsync(`git add ${pagePath} ${dataPath}`);
        await execAsync(`git commit -m "${commitMessage}"`);
        
        if (process.env.AUTO_PUSH === 'true') {
          await execAsync('git push origin main');
        }
      } catch (gitError) {
        console.error('Git operations failed:', gitError);
        // Continue sans faire échouer la requête
      }
    }

    // URL générée
    const generatedUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/prospect/${slug}`;

    // Réponse de succès
    res.status(201).json({
      success: true,
      message: 'Prospect page generated successfully',
      data: {
        slug,
        url: generatedUrl,
        prospectName: prospectData.prospectName,
        companyName: prospectData.companyName,
        createdAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Error generating prospect page:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  }
}