const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/53ef647147890346d1be8a9a30c87ad9.loader.js",
    "Build/3869c86e62126211990e53fda3bf7faa.framework.js",
    "Build/eb2b13fa4ef25b8d9a729b04faa29399.data",
    "Build/23b9bfc82b333b296cd5a8668fa8a6d7.wasm",
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
