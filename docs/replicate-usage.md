# Guide d'Utilisation de l'API Replicate - VelocitAI

## Configuration

### Variables d'environnement
Ajoutez votre token Replicate dans le fichier `.env.local` :

```bash
REPLICATE_API_TOKEN=r8_your_token_here
```

### Installation
Le package Replicate est déjà installé dans le projet :

```bash
npm install replicate
```

## Utilisation

### Endpoint API
**URL :** `/api/generate-image`
**Méthode :** POST

### Paramètres de requête

```json
{
  "prompt": "Description de l'image à générer",
  "model": "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4"
}
```

### Exemple d'utilisation

```javascript
const generateImage = async (prompt) => {
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.imageUrl;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
```

### Modèles disponibles

1. **Stable Diffusion** (par défaut)
   - ID: `stability-ai/stable-diffusion`
   - Idéal pour des images générales

2. **SDXL**
   - ID: `stability-ai/sdxl`
   - Meilleure qualité, plus lent

### Bonnes pratiques

1. **Prompts détaillés** : Plus votre description est précise, meilleur sera le résultat
2. **Style** : Ajoutez des termes comme "professional", "modern", "clean" pour des images business
3. **Résolution** : 1024x768 par défaut, optimisé pour le web
4. **Langage** : Les prompts en anglais donnent généralement de meilleurs résultats

### Exemples de prompts pour articles de blog

```javascript
// Chatbot
"Modern AI chatbot interface, sleek design, blue and white colors, professional business setting, clean UI elements, high quality, digital art"

// Service client
"Professional customer service representative with headset, modern office environment, smiling, friendly, business professional, high quality"

// Automatisation
"Futuristic automation concept, robotic arms, digital interfaces, modern factory, blue and purple lighting, professional photography"
```

### Gestion des erreurs

L'API retourne les erreurs suivantes :
- `400` : Prompt manquant
- `405` : Méthode non autorisée
- `500` : Erreur de génération ou token manquant

### Limites

- Maximum 6 images par article (recommandation SEO)
- Temps de génération : 10-30 secondes par image
- Taille recommandée : 1024x768 pour le web
- Format de sortie : URL vers l'image générée