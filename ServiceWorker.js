const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/a013dab9ec961b7b4e6c02477405c13a.loader.js",
    "Build/4f6e9972efca9ee9a325b6ae366c1377.framework.js",
    "Build/d9063c3c555473d6f0fc635eb7efd48f.data",
    "Build/af6be39c5e53530103abeca60a1b083a.wasm",
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
