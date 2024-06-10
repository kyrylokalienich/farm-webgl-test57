const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/c77f8d9f349436a6d47d357565ed9b6d.loader.js",
    "Build/981ec1e008b9e4ee6663ddbf84f85da4.framework.js",
    "Build/6c82fdfde829f0bca33c2024e7b9d035.data",
    "Build/da360ac30674dc4e890510f0fc30afc5.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
