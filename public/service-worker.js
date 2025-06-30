const CACHE_NAME = "neura-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "/icons/neura-icon-192x192.png",
  "/icons/neura-icon-512x512.png"
];

// Instalando o SW e armazenando arquivos em cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptando requisições para usar o cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Limpando caches antigos na atualização do SW
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
