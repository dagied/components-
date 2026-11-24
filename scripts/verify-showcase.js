import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const uiIndexPath = path.join(rootDir, 'src', 'ui', 'index.ts');
const registryPath = path.join(rootDir, 'src', 'showcase', 'data', 'componentRegistry.tsx');

console.log('🔍 Aura Design System • Showcase Coverage Verification');
console.log('========================================================\n');

if (!fs.existsSync(uiIndexPath)) {
  console.error(`❌ Missing ${uiIndexPath}`);
  process.exit(1);
}

if (!fs.existsSync(registryPath)) {
  console.error(`❌ Missing ${registryPath}`);
  process.exit(1);
}

const uiContent = fs.readFileSync(uiIndexPath, 'utf-8');
const registryContent = fs.readFileSync(registryPath, 'utf-8');

// Extract all export * from './...' paths from src/ui/index.ts
const exportRegex = /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g;
const exportedModules = [];
let match;
while ((match = exportRegex.exec(uiContent)) !== null) {
  exportedModules.push(match[1]);
}

console.log(`📦 Found ${exportedModules.length} exported modules in src/ui/index.ts:`);

let missingCount = 0;
const checkedItems = [];

for (const mod of exportedModules) {
  const parts = mod.split('/');
  const name = parts[parts.length - 1];

  // Look for registration by id: 'name' or related identifier in registry
  // E.g., button, input, navbar, hero, etc.
  const targetIdPattern = new RegExp(`id:\\s*['"]${name}['"]`, 'i');
  const found = targetIdPattern.test(registryContent);

  if (found) {
    checkedItems.push({ module: mod, name, status: '✅ Registered' });
  } else {
    // Check fallback tokens/typography/charts/container
    const isSpecialCase =
      (name === 'ThemeProvider' && /id:\s*['"]tokens['"]/i.test(registryContent)) ||
      (name === 'useTheme' && /id:\s*['"]tokens['"]/i.test(registryContent)) ||
      (name === 'cn' && /id:\s*['"]tokens['"]/i.test(registryContent)) ||
      (name === 'charts' && /id:\s*['"]charts['"]/i.test(registryContent)) ||
      (name === 'container' && /id:\s*['"]container['"]/i.test(registryContent));

    if (isSpecialCase) {
      checkedItems.push({ module: mod, name, status: '✅ Registered (Special/Grouped)' });
    } else {
      checkedItems.push({ module: mod, name, status: '❌ MISSING' });
      missingCount++;
    }
  }
}

for (const item of checkedItems) {
  console.log(`  ${item.status} : ${item.module}`);
}

console.log('\n========================================================');
if (missingCount === 0) {
  console.log(`🎉 100% Showcase Coverage Achieved! All ${exportedModules.length} modules covered in Showcase registry.`);
  process.exit(0);
} else {
  console.error(`⚠️ Found ${missingCount} uncovered module(s) in showcase registry.`);
  process.exit(1);
}
