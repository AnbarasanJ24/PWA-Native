const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
]

// cache size
const limitCacheSize = (name, size) => {

    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

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
self.addEventListener('activate', event => {
    event.waitUntil(
        // cache keys will return cache names as site-static, site-static-v1
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})


// Ftech event proxy
self.addEventListener('fetch', event => {
    // console.log("Fetch events", event)
    event.respondWith(
        caches.match(event.request).then(cacheRes => {

            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 2);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (event.request.url.indexOf('.html') > -1) {
                return caches.match('/pages/fallback.html');
            }
        })
    )
})

