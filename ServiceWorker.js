const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/43965e29dae41a78f0653a344d856cc0.loader.js",
    "Build/d089b75a0264c1b0f948aecdaf0a9e12.framework.js",
    "Build/a840dad364d94ede910710f087b5ecbc.data",
    "Build/8097cccb2fc52179a79f91c3b91ac449.wasm",
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
