const assets = ["/", "/index.html", "/style.css", "/app.js"]
self.addEventListener("install", event => {
    event.waitUntile(
        caches.open("assets").then(caches => {
            caches.addAll(assets);
        })
    )
})
self.addEventListener('fetch', event => {
    console.log("escuchar")
})