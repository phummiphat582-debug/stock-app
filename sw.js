self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const req = event.request;

  // ❌ ไม่ cache ไฟล์ HTML เพื่อให้ realtime ทำงาน
  if (req.destination === "document") {
    event.respondWith(fetch(req));
    return;
  }

  // อย่างอื่นใช้ network ก่อน
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
