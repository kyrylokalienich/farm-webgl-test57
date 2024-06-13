const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/cac7117d8b91b6bfac1bcd28348236c4.loader.js",
    "Build/4d137ba3601f68152db5d4fa5a25f664.framework.js",
    "Build/a140660914d162cc0307c462baa9da0d.data",
    "Build/9d58f14795e61871f498d49e238fe6fc.wasm",
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
