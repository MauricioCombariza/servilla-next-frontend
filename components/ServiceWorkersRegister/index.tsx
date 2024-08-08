import { useEffect } from 'react';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported in this browser.');
      
      // Intenta registrar el Service Worker directamente
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);

          // Actualiza la caché cuando haya una nueva versión del Service Worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              console.log('A new service worker is being installed:', installingWorker);
              installingWorker.onstatechange = () => {
                console.log('Service worker state changed to:', installingWorker.state);
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('New content is available; please refresh.');
                  } else {
                    console.log('Content is now available offline!');
                  }
                }
              };
            }
          };
        })
        .catch(error => {
          console.error('SW registration failed: ', error);
        });
    } else {
      console.log('Service Worker is not supported in this browser.');
    }
  }, []);

  return null;
}