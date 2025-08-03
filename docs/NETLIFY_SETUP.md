# Configuration Netlify pour VelocitAI

## Variables d'environnement à configurer

Allez dans **Site settings > Environment variables** sur Netlify et ajoutez ces variables :

### Variables Airtable (OBLIGATOIRES)

```bash
# Votre clé API Airtable
AIRTABLE_API_KEY=patT01DFqO... (votre clé complète)

# ID de votre base Airtable  
AIRTABLE_BASE_ID=appxpfCeCd7qv9m08

# ID de la table (recommandé) - évite les problèmes avec les caractères spéciaux
AIRTABLE_TABLE_ID=tblo3h87XTGJ24q8o

# OU nom de la table (déconseillé si contient des caractères spéciaux)
# AIRTABLE_TABLE_NAME=Témoignages Clients
```

### Comment trouver ces valeurs

1. **AIRTABLE_API_KEY** :
   - Allez sur https://airtable.com/create/tokens
   - Créez un nouveau token avec les permissions :
     - `data.records:read` sur votre base spécifique
   - Copiez le token (commence par `pat...`)

2. **AIRTABLE_BASE_ID** :
   - Ouvrez votre base Airtable
   - L'ID est dans l'URL : `airtable.com/appXXXXXXXXXXXXXX/...`
   - Format : `appXXXXXXXXXXXXXX`

3. **AIRTABLE_TABLE_ID** :
   - Dans votre base, allez dans la table "Témoignages Clients"
   - Cliquez sur "Help" > "API documentation"
   - L'ID de table est affiché (format : `tblXXXXXXXXXXXXXX`)
   - **Recommandé** : Utilisez l'ID plutôt que le nom pour éviter les problèmes d'encodage

## Problèmes courants

### Les témoignages ne s'affichent pas

1. **Vérifiez les logs Netlify** dans l'onglet "Functions"
2. **Vérifiez les permissions** du token Airtable
3. **Utilisez l'ID de table** au lieu du nom si le nom contient des caractères spéciaux (é, espaces, etc.)

### Erreur 403 Forbidden

- Le token n'a pas les bonnes permissions
- Vérifiez que le token a accès à la base spécifique

### Les données sont en cache

- Les données sont récupérées côté serveur (SSR)
- Redéployez le site pour forcer la mise à jour

## Test en local

```bash
# Créez un fichier .env.local avec vos variables
cp .env.example .env.local

# Éditez .env.local avec vos vraies valeurs
nano .env.local

# Testez
npm run dev

# Vérifiez l'API de test
curl http://localhost:3005/api/test-airtable
```

## Support

Si vous avez des problèmes, vérifiez :
1. Les logs dans Netlify Functions
2. La page de test : `/api/test-airtable`
3. Les permissions du token Airtable