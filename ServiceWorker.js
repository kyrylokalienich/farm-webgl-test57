const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/a485a61a4222309e68a7d0b27470f524.loader.js",
    "Build/3869c86e62126211990e53fda3bf7faa.framework.js",
    "Build/0efbc6d2e8738b3dd59b93076a99995d.data",
    "Build/b5009fa88e7e102552f8d66d7f47840b.wasm",
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
