const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
]



// Install event on service worker
self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Caching shell assets');
            cache.addAll(assets);
        })
    );
})

// Active event on service worker 
self.addEventListener('active', event => {
    console.log("Service Worker is activated")
})


// Ftech event proxy
self.addEventListener('fetch', event => {
    // console.log("Fetch events", event)
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request);
        })
    )
})

