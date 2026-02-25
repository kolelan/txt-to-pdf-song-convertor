// Service Worker для PWA
const CACHE_NAME = 'chords-analyzer-v1';

// Определяем базовый путь
const basePath = self.location.pathname.replace(/\/[^\/]*$/, '/');

const urlsToCache = [
  basePath,
  basePath + 'index.html',
  basePath + 'chords-analyzer.js',
  basePath + 'manifest.json',
  basePath + 'icon-192.png',
  basePath + 'icon-512.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем из кэша, если есть, иначе загружаем из сети
        return response || fetch(event.request);
      })
  );
});
