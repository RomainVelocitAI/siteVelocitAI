# Résolution du conflit de dépendances avec Heroicons

## Problème identifié

Nous avons identifié un conflit de dépendances entre deux bibliothèques d'icônes dans le projet VelocitAI :

- `@heroicons/react` v2.2.0
- `react-icons` v5.5.0

Ce conflit causait des problèmes lors de l'installation des dépendances et de la compilation du projet.

## Analyse

1. **Utilisation dans le projet** :
   - `@heroicons/react` est largement utilisé dans de nombreux composants
   - `react-icons` est déclaré comme dépendance mais n'est pas utilisé dans le code

2. **Nature du conflit** :
   - Les deux bibliothèques fournissent des fonctionnalités similaires
   - `react-icons` v5.5.0 peut avoir des incompatibilités avec certaines versions de React ou d'autres dépendances

## Solution mise en œuvre

Nous avons choisi de **supprimer react-icons** car :
1. Cette bibliothèque n'est pas utilisée dans le code
2. `@heroicons/react` est déjà bien intégré et fonctionne correctement
3. Cette approche minimise les changements nécessaires

### Actions réalisées

1. **Suppression de react-icons du package.json**
   ```diff
   - "react-icons": "^5.5.0",
   ```

2. **Création d'un script de nettoyage** (`clean-install.sh`) pour :
   - Supprimer les dépendances problématiques
   - Réinstaller proprement @heroicons/react

3. **Documentation** de la solution et des alternatives possibles

## Comment utiliser la solution

1. Exécutez le script de nettoyage :
   ```bash
   ./clean-install.sh
   ```

2. Reconstruisez l'application :
   ```bash
   npm run build
   ```

## Alternatives considérées

1. **Migration complète vers react-icons** :
   - Avantage : Plus grande bibliothèque d'icônes
   - Inconvénient : Nécessiterait de refactoriser tous les imports d'heroicons

2. **Downgrade de react-icons** :
   - Installation de react-icons@4.12.0 qui est plus stable
   - Mais inutile puisque react-icons n'est pas utilisé

## Conclusion

Cette solution résout le conflit de dépendances tout en maintenant la fonctionnalité existante du calculateur VelocitAI et du reste du site. Le projet peut maintenant être compilé et déployé sans problèmes liés aux dépendances d'icônes.