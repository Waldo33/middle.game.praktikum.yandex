const CACHE_NAME = 'v2';

const URLS_TO_CACHE = [
  '/',
  '/signin',
  '/signup',
  '/game',
  '/profile',
  '/leaderboard',
  '/forum',
  '/add',
  '/index.html',
  '/manifest.json',
  '/favicon-dark.svg',
  '/favicon-light.svg',
  '/assets/',
  '/assets/images/cards',
];

const saveResourcesToCache = async (cacheName, urls) => {
  caches.open(cacheName)
    .then((cache) => cache.addAll(urls))
    .catch((error) => console.error('Не удалось закешировать ресурсы:', error))
}

const clearOldCache = async (cacheName) => {
  try {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map((cache) => {
        if (cache !== cacheName) {
          console.log('Удален старый кэш:', cache);
          return caches.delete(cache);
        }
      })
    );
  } catch (error) {
    console.log(error)
  }
}

const getResponseFromCacheOrResponseAndSave = async (event) => {
  try {
    const response = await caches.match(event.request);

    if(response) {
      return response;
    }

    const networkResponse = await fetch(event.request);

    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
      return networkResponse;
    }

    const responseToCache = networkResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, responseToCache);

    return networkResponse;
  } catch (error) {
    if (event.request.mode === 'navigate') {
      return caches.match('/index.html');
    }
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(saveResourcesToCache(CACHE_NAME, URLS_TO_CACHE));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clearOldCache(CACHE_NAME));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(getResponseFromCacheOrResponseAndSave(event));
});