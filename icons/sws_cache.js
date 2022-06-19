const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');

  //remove unwanted caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call Fetch Event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  event.respondWith(
    fetch(event.request)
    .then(res => {
      //make copy/clone of response
      const resClone = res.clone();
      //open cache
      caches
        .open(cacheName)
        .then(cache => {
          //Add response to cache
          cache.put(event.request, resClone);
        });
      return res;
    })
    .cactch(erro => catches.match(e.request).then(res => res))
  );
});
