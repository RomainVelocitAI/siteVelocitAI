# 📝 Guide Technique - Création d'Articles Blog VelocitAI

## 🎯 Mission
Créer des articles de blog pour VelocitAI (automatisation IA pour PME) en utilisant l'API Airtable. Vous rédigez librement le contenu, ce guide vous indique uniquement quoi mettre dans chaque champ du record Airtable.

## 🔑 Accès Airtable
**API Key** : `patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741`
**Base ID** : `appBsMKnq8zWDIMNr`
**Table** : `Blog Articles`

### URL API pour créer un article :
```
POST https://api.airtable.com/v0/appBsMKnq8zWDIMNr/Blog%20Articles
```

## 📋 Champs du Record Airtable

### 1. **Title** (OBLIGATOIRE)
- **Type** : Texte libre
- **Contenu** : Le titre de votre article
- **Exemple** : `"Chatbots IA 2025 : Révolutionner Votre Service Client"`

### 2. **Description** (OBLIGATOIRE)
- **Type** : Texte libre
- **Contenu** : Résumé/excerpt de l'article
- **Exemple** : `"Découvrez comment les chatbots IA transforment le service client des PME en 2025."`

### 3. **Content** (OBLIGATOIRE)
- **Type** : Markdown
- **Contenu** : L'article complet avec **exactement 6 images intégrées**
- **IMPORTANT** : Utilisez cette syntaxe pour les images :
```markdown
![Description de l'image]({{Image 1 URL}})
![Autre description]({{Image 2 URL}})
![Encore une image]({{Image 3 URL}})
![Quatrième image]({{Image 4 URL}})
![Cinquième image]({{Image 5 URL}})
![Dernière image]({{Image 6 URL}})
```
- **Note** : Le système remplacera automatiquement `{{Image X URL}}` par les vraies URLs

### 4. **Slug** (OBLIGATOIRE)
- **Type** : Texte
- **Contenu** : Version URL du titre (minuscules, tirets, sans accents)
- **Exemple** : `"chatbots-ia-service-client-2025"`

### 5. **Status** (OBLIGATOIRE)
- **Type** : Sélection
- **Valeur EXACTE** : `"Scheduled"`
- **Important** : Toujours mettre "Scheduled" pour que le système publie automatiquement

### 6. **Author** (OBLIGATOIRE)
- **Type** : Texte
- **Valeur EXACTE** : `"Équipe VelocitAI"`

### 7. **Category** (OBLIGATOIRE)
- **Type** : Sélection
- **Choisir UNE valeur parmi** :
  - `"Automatisation"`
  - `"IA & Chatbots"`
  - `"Productivité"`
  - `"Stratégie"`
  - `"Cas d'usage"`

### 8. **Read Time** (OBLIGATOIRE)
- **Type** : Nombre entier
- **Contenu** : Temps de lecture estimé en minutes
- **Calcul** : Comptez vos mots ÷ 200 (arrondi supérieur)

### 9-14. **Images URLs** (OBLIGATOIRES - 6 champs)
- **Image 1 URL** : URL de la première image
- **Image 2 URL** : URL de la deuxième image  
- **Image 3 URL** : URL de la troisième image
- **Image 4 URL** : URL de la quatrième image
- **Image 5 URL** : URL de la cinquième image
- **Image 6 URL** : URL de la sixième image

**Format recommandé Unsplash** :
```
https://images.unsplash.com/photo-[ID]?w=800&h=600&fit=crop
```

## 📊 Exemple Complet de Requête API

```json
{
  "fields": {
    "Title": "Votre titre d'article",
    "Description": "Votre résumé d'article",
    "Content": "# Votre Article\n\n![Description]({{Image 1 URL}})\n\nVotre contenu...\n\n![Autre image]({{Image 2 URL}})\n\nPlus de contenu...\n\n![Troisième]({{Image 3 URL}})\n\nEncore du contenu...\n\n![Quatrième]({{Image 4 URL}})\n\nContenu...\n\n![Cinquième]({{Image 5 URL}})\n\nContenu final...\n\n![Dernière]({{Image 6 URL}})",
    "Slug": "votre-slug-article",
    "Status": "Scheduled",
    "Author": "Équipe VelocitAI",
    "Category": "Automatisation",
    "Read Time": 8,
    "Image 1 URL": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    "Image 2 URL": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    "Image 3 URL": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "Image 4 URL": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    "Image 5 URL": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    "Image 6 URL": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
  }
}
```

## ⚠️ Points Critiques à Retenir

### 🔴 OBLIGATOIRE - Syntaxe des Images
Dans le champ **Content**, utilisez EXACTEMENT cette syntaxe :
```markdown
![Description]({{Image 1 URL}})
![Description]({{Image 2 URL}})
![Description]({{Image 3 URL}})
![Description]({{Image 4 URL}})
![Description]({{Image 5 URL}})
![Description]({{Image 6 URL}})
```

### 🔴 OBLIGATOIRE - Valeurs Exactes
- **Status** : `"Scheduled"` (pas "scheduled" ou autre)
- **Author** : `"Équipe VelocitAI"` (exactement comme ça)
- **Category** : Une des 5 valeurs exactes listées plus haut

### 🔴 OBLIGATOIRE - 6 Images
- Remplissez les 6 champs Image X URL
- Utilisez les 6 placeholders {{Image X URL}} dans le contenu
- Le système ne fonctionnera pas sans les 6 images

## 🚀 Commande cURL pour Créer un Article

```bash
curl -X POST \
  -H "Authorization: Bearer patQ1wcNaHGSuFDRQ.792c6418500e584f18a01b17f4c761ee5d1331230e1b40fc361e7591f5d01741" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "Title": "[VOTRE_TITRE]",
      "Description": "[VOTRE_DESCRIPTION]",
      "Content": "[VOTRE_CONTENU_MARKDOWN_AVEC_6_IMAGES]",
      "Slug": "[votre-slug]",
      "Status": "Scheduled",
      "Author": "Équipe VelocitAI",
      "Category": "[UNE_DES_5_CATEGORIES]",
      "Read Time": [NOMBRE_ENTIER],
      "Image 1 URL": "[URL_IMAGE_1]",
      "Image 2 URL": "[URL_IMAGE_2]",
      "Image 3 URL": "[URL_IMAGE_3]",
      "Image 4 URL": "[URL_IMAGE_4]",
      "Image 5 URL": "[URL_IMAGE_5]",
      "Image 6 URL": "[URL_IMAGE_6]"
    }
  }' \
  https://api.airtable.com/v0/appBsMKnq8zWDIMNr/Blog%20Articles
```

## 🎯 Résumé pour l'Agent IA

**Vous êtes libre de rédiger comme vous voulez, mais respectez ces règles techniques :**

1. **Créez un record Airtable** avec exactement ces 14 champs
2. **Mettez Status = "Scheduled"** pour publication automatique
3. **Intégrez 6 images** avec la syntaxe `{{Image X URL}}`
4. **Remplissez les 6 URLs d'images** dans les champs séparés
5. **Utilisez les valeurs exactes** pour Author et Category

**Le système s'occupe du reste automatiquement !**