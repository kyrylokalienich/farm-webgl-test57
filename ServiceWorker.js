const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/5159eb2f5d8ac16c5e1a47b36be68d69.loader.js",
    "Build/0471839c09ce3dd1ccbdabbb00b273b3.framework.js",
    "Build/5705353ddb9dda1ded9f5f3c11be5ad5.data",
    "Build/b271b803bc28c9d2c6d01833055d5410.wasm",
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
