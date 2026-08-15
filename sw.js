// Cambiamos la versión de la caché para forzar la actualización automática en todos los dispositivos
const CACHE_NAME = 'bugambilia-v3';

const ASSETS = [
  './',
  './index.html',
  './cotizador.html',
  './servicios.html',
  './eventohospedaje.html',
  './contrato_hospedaje.html',
  './contrato_evento.html',
  './ventas.html',
  './rentas.html',
  './style.css',
  './nav.js',
  './manifest.json',
  './icon.png'
];

// Instalación inmediata
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Peticiones: Intentar RED primero (ideal para datos móviles)
self.addEventListener('fetch', (e) => {
  // Ignorar consultas a Google Sheets para que no las intercepte la caché y carguen directo por la red de datos
  if (e.request.url.includes('google.com') || e.request.url.includes('googleapis.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Si hay respuesta de la red (Wi-Fi o Datos), actualiza la caché y entrega la página fresca
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        return response;
      })
      .catch(() => caches.match(e.request)) // Si de verdad no hay conexión, usa la memoria local
  );
});
