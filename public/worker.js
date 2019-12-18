/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'pwa-election-guard'
const urlsToCache = []

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = ['pwa-election-guard']
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
