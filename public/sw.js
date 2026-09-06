const AI_CACHE_NAME =
  "fancybgr-ai-assets-v1";

const IMGLY_HOST =
  "staticimgly.com";

const IMGLY_DATA_PATH =
  "/@imgly/background-removal-data/1.7.0/dist/";

self.addEventListener(
  "install",
  () => {
    self.skipWaiting();
  },
);

self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      self.clients.claim(),
    );
  },
);

function isAIAssetRequest(request) {
  if (request.method !== "GET") {
    return false;
  }

  const url =
    new URL(request.url);

  return (
    url.hostname === IMGLY_HOST &&
    url.pathname.startsWith(
      IMGLY_DATA_PATH,
    )
  );
}

async function cacheAIAsset(
  request,
) {
  const cache =
    await caches.open(
      AI_CACHE_NAME,
    );

  const cachedResponse =
    await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse =
    await fetch(request);

  if (networkResponse.ok) {
    await cache.put(
      request,
      networkResponse.clone(),
    );
  }

  return networkResponse;
}

self.addEventListener(
  "fetch",
  (event) => {
    if (
      !isAIAssetRequest(
        event.request,
      )
    ) {
      return;
    }

    event.respondWith(
      cacheAIAsset(
        event.request,
      ),
    );
  },
);