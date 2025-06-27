import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import https from 'https';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Function to download image from URL and save locally
async function downloadAndSaveImage(imageUrl: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const publicDir = path.join(process.cwd(), 'public', 'images', 'blog', 'chatbots-ia-service-client-2025');
    
    // Ensure directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const filepath = path.join(publicDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        const publicPath = `/images/blog/chatbots-ia-service-client-2025/${filename}`;
        resolve(publicPath);
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, filename } = req.body;

    if (!prompt || !filename) {
      return res.status(400).json({ error: 'Prompt and filename are required' });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'Replicate API token not configured' });
    }

    console.log('Generating image with prompt:', prompt);

    const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
      input: {
        prompt: prompt,
        aspect_ratio: "4:3",
        output_format: "png",
        output_quality: 90,
        prompt_upsampling: true
      }
    });

    if (!output) {
      throw new Error('No image generated');
    }

    // Flux models return a single URL, not an array
    const tempImageUrl = typeof output === 'string' ? output : Array.isArray(output) ? output[0] : String(output);
    
    console.log('Image generated, downloading and saving locally...');
    
    // Download and save the image locally before the URL expires
    const localPath = await downloadAndSaveImage(tempImageUrl, filename);

    return res.status(200).json({ 
      success: true, 
      imageUrl: tempImageUrl, // Temporary URL for reference
      localPath: localPath,   // Permanent local path
      filename: filename,
      prompt: prompt
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ 
      error: 'Failed to generate image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}