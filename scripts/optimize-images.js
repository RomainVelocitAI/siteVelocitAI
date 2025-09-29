const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const optimizedDir = path.join(__dirname, '../public/images-optimized');

// Créer le dossier optimized s'il n'existe pas
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Fonction pour trouver toutes les images PNG volumineuses
function findLargeImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findLargeImages(filePath, fileList);
    } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const size = stat.size;
      if (size > 500 * 1024) { // Plus de 500KB
        fileList.push({ path: filePath, size });
      }
    }
  });

  return fileList;
}

// Fonction pour optimiser une image
async function optimizeImage(filePath) {
  const relativePath = path.relative(imagesDir, filePath);
  const outputPath = path.join(optimizedDir, relativePath);
  const outputDir = path.dirname(outputPath);

  // Créer le dossier de sortie
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(outputDir, `${baseName}.webp`);

  try {
    const originalSize = fs.statSync(filePath).size;

    // Convertir en WebP avec compression
    await sharp(filePath)
      .resize(1200, null, { // Max width 1200px, hauteur proportionnelle
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85 })
      .toFile(webpPath);

    const newSize = fs.statSync(webpPath).size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

    console.log(`✅ ${relativePath}`);
    console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (-${reduction}%)`);

    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.error(`❌ Erreur avec ${relativePath}:`, error.message);
    return null;
  }
}

// Fonction principale
async function main() {
  console.log('🔍 Recherche des images volumineuses (>500KB)...\n');

  const largeImages = findLargeImages(imagesDir);

  if (largeImages.length === 0) {
    console.log('✅ Aucune image volumineuse trouvée !');
    return;
  }

  console.log(`📊 ${largeImages.length} images à optimiser\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const image of largeImages) {
    const result = await optimizeImage(image.path);
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📈 RÉSULTAT GLOBAL:');
  console.log(`   Taille originale: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Taille optimisée: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Gain total: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)}MB (-${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(2)}%)`);
  console.log('='.repeat(60));
  console.log('\n💡 Les images optimisées sont dans /public/images-optimized/');
  console.log('   Remplacez manuellement les originales après vérification.');
}

main().catch(console.error);