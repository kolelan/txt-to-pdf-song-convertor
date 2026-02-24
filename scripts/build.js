#!/usr/bin/env node

/**
 * Скрипт для сборки с настраиваемыми путями
 * 
 * Использование:
 *   npm run build:custom -- --base-url=ttp_v3 --relative-paths
 *   npm run build:custom -- --base-url=ttp_v3 --absolute-paths
 * 
 * Параметры:
 *   --base-url=<url>     - Базовый URL (например, ttp_v3). По умолчанию: /
 *   --relative-paths     - Использовать относительные пути (по умолчанию)
 *   --absolute-paths     - Использовать абсолютные пути
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Парсим аргументы командной строки
const args = process.argv.slice(2);
let baseUrl = '';
let useRelativePaths = true;

args.forEach(arg => {
  if (arg.startsWith('--base-url=')) {
    const url = arg.split('=')[1].replace(/^\/+|\/+$/g, '');
    baseUrl = url ? '/' + url : '';
  } else if (arg === '--relative-paths') {
    useRelativePaths = true;
  } else if (arg === '--absolute-paths') {
    useRelativePaths = false;
  }
});

// Определяем homepage для package.json
// В create-react-app:
// - Если homepage = ".", пути будут относительными (./static/js/main.js)
// - Если homepage = "/ttp_v3", пути будут абсолютными от корня (/ttp_v3/static/js/main.js)
// - Если homepage = "ttp_v3", пути будут относительными от базового URL (ttp_v3/static/js/main.js)
let homepage;
if (baseUrl) {
  // Если указан базовый URL
  if (useRelativePaths) {
    // Для относительных путей используем базовый URL без начального слэша
    homepage = baseUrl.replace(/^\//, '');
  } else {
    // Для абсолютных путей используем полный путь со слэшем
    homepage = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl;
  }
} else {
  // Если базовый URL не указан
  homepage = useRelativePaths ? '.' : '/';
}

console.log('🔨 Настройки сборки:');
console.log(`   Базовый URL: ${baseUrl || '/'}`);
console.log(`   Пути к ресурсам: ${useRelativePaths ? 'относительные' : 'абсолютные'}`);
console.log(`   Homepage: ${homepage}`);
console.log('');

// Читаем package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Сохраняем оригинальный homepage
const originalHomepage = packageJson.homepage;

// Устанавливаем новый homepage
packageJson.homepage = homepage;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Устанавливаем переменные окружения
// PUBLIC_URL используется для замены %PUBLIC_URL% в HTML файлах
if (baseUrl) {
  process.env.PUBLIC_URL = baseUrl;
} else {
  process.env.PUBLIC_URL = '';
}
process.env.INLINE_RUNTIME_CHUNK = 'false';

// Запускаем сборку
console.log('🚀 Запуск сборки...\n');
try {
  execSync('npx react-scripts build', { 
    stdio: 'inherit',
    env: { ...process.env },
    cwd: path.join(__dirname, '..')
  });
  
  // Если нужны относительные пути, заменяем абсолютные пути в index.html
  if (useRelativePaths && baseUrl) {
    const indexPath = path.join(__dirname, '..', 'build', 'index.html');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      // Заменяем абсолютные пути /ttp_v4/ на относительные (без префикса)
      // Когда приложение развернуто в ttp_v4/, пути должны быть относительно этой папки
      const absolutePath = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl;
      // Для относительных путей убираем префикс полностью - файлы уже в нужной папке
      const regex = new RegExp(absolutePath.replace(/\//g, '\\/') + '/', 'g');
      indexContent = indexContent.replace(regex, '');
      fs.writeFileSync(indexPath, indexContent, 'utf8');
      console.log('   ✏️  Пути в index.html заменены на относительные (без префикса базового URL)');
    }
  }
  
  console.log('\n✅ Сборка завершена успешно!');
  console.log(`📦 Файлы находятся в папке: build/`);
  if (baseUrl) {
    console.log(`📁 Для развертывания поместите содержимое build/ в папку: ${baseUrl}`);
  }
} catch (error) {
  console.error('\n❌ Ошибка при сборке:', error.message);
  // Восстанавливаем оригинальный homepage
  packageJson.homepage = originalHomepage;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  process.exit(1);
}

// Восстанавливаем оригинальный homepage
packageJson.homepage = originalHomepage;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
