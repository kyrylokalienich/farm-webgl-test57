const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/318719c196c5887074edabf410809879.loader.js",
    "Build/cd1d69b32a3d0cb0d504bf18c9ebf294.framework.js",
    "Build/c2605794e4618f5880bc0eea4fd7524e.data",
    "Build/8ea7eb80d5587792572a69f4cda679fd.wasm",
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
