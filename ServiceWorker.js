const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/2cb87530ada8fcbe3bf12f8a78727408.loader.js",
    "Build/d089b75a0264c1b0f948aecdaf0a9e12.framework.js",
    "Build/01b24c9c4ffce69491f0a0a7877f7279.data",
    "Build/c125de81374b0fea3678e691dd8d929b.wasm",
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
