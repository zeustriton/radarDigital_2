import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generateLogo() {
  const zai = await ZAI.create();

  console.log('Generating logo for Radar EleccIA...');

  try {
    const response = await zai.images.generations.create({
      prompt: 'Modern minimalist logo design for "Radar EleccIA" electoral platform, radar or circular radar scan concept, Peru flag colors red and white, professional clean design, vector style, white background, simple geometric shapes, technology and democracy theme, high quality, transparent background style',
      size: '1024x1024'
    });

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');

    // Create output directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, 'logo.svg');
    fs.writeFileSync(outputPath, buffer);

    console.log(`✓ Logo saved to: ${outputPath}`);
    console.log(`  File size: ${buffer.length} bytes`);

    return outputPath;
  } catch (error) {
    console.error('Error generating logo:', error);
    throw error;
  }
}

// Run the logo generation
generateLogo().catch(console.error);
