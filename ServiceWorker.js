const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/1fc3d064e1eb21b1ac92243e7b312b28.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/6e0c3f0d1d72ba4c25d2ae9566c8069e.data",
    "Build/681c09145274543032649cce9d5810fd.wasm",
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
