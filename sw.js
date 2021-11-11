// Install event on service worker
self.addEventListener('install', event => {
    console.log("Service Worker is installed")
})

// Active event on service worker
self.addEventListener('active', event => {
    console.log("Service Worker is activated")
})


// Ftech event proxy
self.addEventListener('fetch', event => {
    console.log("Fetch events", event)
})