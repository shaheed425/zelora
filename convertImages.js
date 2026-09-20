import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'd:/Clintssss/ZELORA/frontend/public/images';

const files = fs.readdirSync(imagesDir);

for (const file of files) {
  if (file.endsWith('.png')) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));
    
    console.log(`Converting ${file} -> ${path.basename(outputPath)}...`);
    await sharp(inputPath)
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);
      
    const oldSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    console.log(`✅ ${file}: ${(oldSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (Saved ${(((oldSize - newSize) / oldSize) * 100).toFixed(1)}%)`);
  }
}
