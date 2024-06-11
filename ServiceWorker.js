const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/60f1c9c2a5f5bfbfad025c906dbc9009.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/7988bdbfa42e558f6640adcf7dea8f7a.data",
    "Build/c1a440d99489fbf0224fcfcd8c762156.wasm",
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
