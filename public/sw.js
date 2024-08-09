const CACHE_NAME = 'servilla-cache-v1';
const urlsToCache = [
  '/',
  '/Home',
  '/Servicio/Distribucion',
  '/Servicio/Paqueteo',
  '/Servicio/Fulfillment',
  '/Servicio/Alistamiento',
  '/Servicio/Dropshipping',
  '/Aplicacion',
  '/Contactenos',
  '/Ingresar',
  '/Registrarse',
  // Añade aquí otras rutas que quieras cachear
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url).then(response => {
              if (!response.ok) {
                console.error(`Error al cargar el recurso: ${url} - Status: ${response.status}`);
                throw new Error(`Error al cargar el recurso: ${url} - Status: ${response.status}`);
              }
              return cache.put(url, response);
            }).catch(error => {
              console.error(`Error al intentar cargar el recurso: ${url}`, error);
            });
          })
        );
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});