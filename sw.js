const cacheName = 'v3';

//inserir a quantidade de paginas que temos
const cacheAssets = [
  'index.html',
  'indexcss.css',
  'manifest.json',
  'main.js',
  'firebase.js',
  'stylegeral.css',
  'Home/home.html',
  'Home/homestyle.css',
  'Home/perfilstyle.css',
  'Home/perfil.html',
  'Home/definicoes.html',
  'Home/defstyle.css',
  'Signin/login.html',
  'Signin/loginstyle.css',
  'Signin/register.html',
  'Signin/registerstyle.css',
  'Signin/register1.html',
  'Signin/register1.css',
  'Signin/guestregister.html',
  'games/rockpaperscissors/chooseop.html',
  'games/rockpaperscissors/expli.html',
  'games/rockpaperscissors/game.html',
  'games/rockpaperscissors/gamescript.js',
  'games/rockpaperscissors/gamestyle.css',
  'games/tictactoe/gamestyle.css',
  'games/tictactoe/gamescript.js',
  'games/tictactoe/game.html',
  'games/tictactoe/expli.html',
  'games/tictactoe/chooseop.html'
];

// Evento chamar e instalar
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');

  event.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

// chamar ativar Evento
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');

  //remover caches que nao queremos
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

//chamar evento Fetch
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})
