const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/32620373295de62d44f3dc7a0963135b.loader.js",
    "Build/fea213669a86925388ce14d3c224d097.framework.js",
    "Build/2b4848a54d98eaf6a79f0fa5ae7ce73d.data",
    "Build/8bab3e69d9b138d28adcfdfd0457e236.wasm",
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
