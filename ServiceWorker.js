const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/44ac1b3f9355e7ca620df37e79133fd8.loader.js",
    "Build/4d137ba3601f68152db5d4fa5a25f664.framework.js",
    "Build/6e60ccce64fd39c828208074aa1fcc38.data",
    "Build/960268e5eb7809b2f504747c42902c49.wasm",
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
