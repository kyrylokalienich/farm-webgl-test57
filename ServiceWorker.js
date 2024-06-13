const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/a71b1e6d26e0e2e79dd10c934686ac85.loader.js",
    "Build/3937cb8b01ae9f6ecc4d36b211addcac.framework.js",
    "Build/6822f1e21c8f3528d4c25955fe6d2781.data",
    "Build/2182c20e7caa9fcf1b7b7db3f459a4e0.wasm",
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
