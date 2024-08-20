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
  // Filtrar solo solicitudes GET y evitar las solicitudes de chrome-extension
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Verifica si la respuesta es válida antes de cachearla
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cachea solo solicitudes GET válidas
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(error => {
        console.error('Error al responder desde el caché o la red', error);
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
