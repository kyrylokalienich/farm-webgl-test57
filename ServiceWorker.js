const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/01f2e857705f878ddc39a446834fc91c.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/57ed3118d6ce74735f7aee271109a0c7.data",
    "Build/2b7ed57c62fe61abe49817100f68875f.wasm",
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
