var localCache = "sg-v1";
var assets = [
    "./",
    "index.html",
    "style.css",
    "script.js",
    "manifest.json"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(localCache).then(cache => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
