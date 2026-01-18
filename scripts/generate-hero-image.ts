import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generateProposalImage() {
  const zai = await ZAI.create();

  console.log('Generating image for Peru technology proposals...');

  try {
    const response = await zai.images.generations.create({
      prompt: 'Modern digital government concept, Peru flag colors red and white, futuristic technology interface with data visualization, professional and clean design, digital transformation, interconnected networks, government services digitalization, high quality, detailed, modern tech aesthetic',
      size: '1440x720'
    });

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');

    // Create public/images directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const outputPath = path.join(imagesDir, 'tech-proposals-hero.png');
    fs.writeFileSync(outputPath, buffer);

    console.log(`✓ Image saved to: ${outputPath}`);
    console.log(`  File size: ${buffer.length} bytes`);

    return outputPath;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// Run the image generation
generateProposalImage().catch(console.error);
