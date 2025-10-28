const fs = require('fs');
const path = require('path');

function writeExampleAndEnv(dir, exampleContent) {
  const examplePath = path.join(dir, '.env.example');
  fs.writeFileSync(examplePath, exampleContent, 'utf8');
  const envPath = path.join(dir, '.env');
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log(`Created ${path.relative(process.cwd(), envPath)} from .env.example`);
  } else {
    console.log(`Skipped creating ${path.relative(process.cwd(), envPath)} (exists)`);
  }
}

const backendDir = path.resolve(process.cwd(), 'backend');
const frontendDir = path.resolve(process.cwd(), 'frontend');

const backendExample = `# Backend environment (NestJS + Prisma)\nDATABASE_URL=postgresql://app:app@localhost:5432/sketch_history\nPORT=3000\nCORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173\n`;

const frontendExample = `# Frontend environment (Vite)\nVITE_API_URL=http://localhost:3000/api\n`;

writeExampleAndEnv(backendDir, backendExample);
writeExampleAndEnv(frontendDir, frontendExample);

console.log('Environment scaffolding complete.');