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
  'https://res.cloudinary.com/combariza/image/upload/c_fill,w_200,h_50/v1643312479/Servilla/servilla_logo_white_pzdmwm.png',
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
        console.log('Cache abierto');
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
      .catch(error => {
        console.error('Error al abrir el caché:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
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

self.addEventListener('fetch', event => {
  console.log('Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(function (res) {
            // Check if the request URL scheme is supported
            const url = new URL(event.request.url);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              return caches.open(CACHE_NAME)
                .then(function (cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            } else {
              console.warn('Unsupported request scheme:', url.protocol);
            }
            return res;
          })
          .catch(function (error) {
            console.error('Fetch failed:', error);
            throw error;
          });
      })
  );
});