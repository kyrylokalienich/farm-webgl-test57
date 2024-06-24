const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/b29dc1908f7cabfcaf5c6a75f2ae5d3a.loader.js",
    "Build/cd1d69b32a3d0cb0d504bf18c9ebf294.framework.js",
    "Build/ffcc7ef09a082dd23e5a0c9e44b05968.data",
    "Build/172283fc9bba7da946b0effa60ecd124.wasm",
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
