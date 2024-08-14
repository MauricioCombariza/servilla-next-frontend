const CACHE_NAME = 'servilla-app-cache-v1';
const urlsToCache = [
  '/',
  '/Contactenos',
  '/Ingresar',
  '/Registrarse',
  '/Mision',
  '/Vision',
  '/Calidad',
  '/Servicio/Distribucion',
  '/Servicio/Paqueteo',
  '/Servicio/Dropshipping',
  '/Servicio/Email',
  '/Servicio/Fullfilment',
  '/Servicio/Alistamiento',
  '/Aplicacion',
  'https://res.cloudinary.com/combariza/image/upload/v1695061362/Servilla/servilla_favicon.png',
  'https://res.cloudinary.com/combariza/image/upload/c_crop,g_center,z_0.5/v1643213357/Servilla/delivery3_imei5v.webp',
  'https://res.cloudinary.com/combariza/image/upload/,c_limit/v1643213349/Servilla/delivery2_djawkh.jpg',
  'https://res.cloudinary.com/combariza/image/upload/c_scale,w_auto/v1720441774/Servilla/inventario.jpg',
  'https://res.cloudinary.com/combariza/image/upload/c_scale,w_auto/v1720442450/Servilla/empaque.jpg',
  'https://res.cloudinary.com/combariza/image/upload/c_scale,w_auto/v1720447327/Servilla/dropshipping.jpg',
  // Añade aquí otras rutas que quieras cachear
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error al agregar recursos al caché', error);
      })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            return caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, response.clone());
                return response;
              });
          });
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
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepción de las solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('Error al responder desde el caché o la red', error);
      })
  );
});