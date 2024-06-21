const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/b688e6f7f9caf90479734a1ebb073bcf.loader.js",
    "Build/2a1f9871ddcade1ad7337b2b110363eb.framework.js",
    "Build/4382ae208fb5d3f110719f5770e395e8.data",
    "Build/1ea9fab117eafa8d1dd81764b383e653.wasm",
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
