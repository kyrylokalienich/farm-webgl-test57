const cacheName = "DefaultCompany-Test-Tranport-Mathcmaking-0.1.0";
const contentToCache = [
    "Build/b1359e8348c605a463964efa08bf3880.loader.js",
    "Build/8633bea1de86e22b8f3cfded512a00a9.framework.js",
    "Build/298513a5c8ba3111a7686607eb575bad.data",
    "Build/f49a3df8edb32f5529c558e8fd7c9b5f.wasm",
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
