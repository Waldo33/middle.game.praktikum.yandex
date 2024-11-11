const CACHE_NAME = 'v2';

const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon-dark.svg',
  '/favicon-light.svg',
];

const saveResourcesToCache = async (cacheName, urls) => {
  caches.open(cacheName)
    .then((cache) => cache.addAll(urls).then(() => self.skipWaiting()))
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
    const cachedResponse = await caches.match(event.request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(event.request);

    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    if (event.request.mode === 'navigate') {
      return caches.match('/index.html');
    }
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(saveResourcesToCache(CACHE_NAME, URLS_TO_CACHE));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clearOldCache(CACHE_NAME));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(getResponseFromCacheOrResponseAndSave(event));
});