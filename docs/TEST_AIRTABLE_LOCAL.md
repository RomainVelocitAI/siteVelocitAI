# Test local des témoignages Airtable

## 1. Configuration de la clé API Airtable

1. Allez sur https://airtable.com/account
2. Dans la section "API", cliquez sur "Generate API key" (ou copiez votre clé existante)
3. Ouvrez le fichier `.env.local` 
4. Remplacez `keyXXXXXXXXXXXXXX` par votre vraie clé API

## 2. Structure de la table

Votre table "Témoignages Clients" doit avoir ces 4 colonnes :
- **Nom Entreprise** (texte)
- **Vidéo** (fichier attaché)
- **Témoignage Écrit** (texte long)
- **Thumbnail** (fichier attaché)

## 3. Ajouter des témoignages de test

Dans Airtable, ajoutez quelques lignes de test :

### Exemple 1
- **Nom Entreprise**: Caillot Immobilier
- **Vidéo**: Uploadez une vidéo ou laissez vide
- **Témoignage Écrit**: "VelocitAI a transformé notre façon de travailler. Les résultats dépassent toutes nos attentes."
- **Thumbnail**: Uploadez une image 16:9 (1280x720px recommandé)

### Exemple 2  
- **Nom Entreprise**: Scaleable Agency
- **Vidéo**: Uploadez une vidéo ou laissez vide
- **Témoignage Écrit**: "Une expertise technique exceptionnelle doublée d'une compréhension profonde des enjeux business."
- **Thumbnail**: Uploadez une image 16:9

## 4. Tester en local

```bash
# Redémarrer le serveur de développement
npm run dev
```

Puis visitez http://localhost:3000 et scrollez jusqu'à la section témoignages.

## 5. Vérifier que ça fonctionne

- Les témoignages d'Airtable devraient apparaître
- Si pas de vidéo uploadée, le bouton play sera désactivé
- Si pas de thumbnail, une image par défaut sera utilisée
- Le premier témoignage sera automatiquement "featured" (mis en avant)

## 6. En cas de problème

1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs du terminal où `npm run dev` tourne
3. Vérifiez que votre clé API est correcte
4. Vérifiez que les noms des colonnes sont exactement :
   - "Nom Entreprise" (avec espace et majuscules)
   - "Vidéo" (avec accent)
   - "Témoignage Écrit" (avec espace et accent)
   - "Thumbnail"

## 7. Points importants

- Les vidéos peuvent être des fichiers uploadés OU des URLs
- Les thumbnails doivent être des images (PNG, JPG, etc.)
- Si aucun témoignage Airtable, les témoignages de fallback seront utilisés
- Le cache API dure 1 heure (redémarrez le serveur pour forcer le refresh)