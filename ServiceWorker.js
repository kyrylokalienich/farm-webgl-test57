const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/df0410f5d58365d1a0cde472ca7e6f0f.loader.js",
    "Build/308406784c524d0921b9744784766ef5.framework.js",
    "Build/f00ff7a7cf13465e9696ea8669bfdee4.data",
    "Build/58e4894a3ab2d8bd0141616bcc409ec1.wasm",
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
