const CACHE_NAME = 'mustafa-courses-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/Iceland_Driving_Guide.html',
  '/agent-tracing-observability-course.html',
  '/ai-evals-measurement-course.html',
  '/ai-infrastructure-at-scale-course.html',
  '/ai-product-strategy-edtech-course.html',
  '/claims-system-architecture-course.html',
  '/claude-agent-network-course.html',
  '/claude-agent-sdk-course.html',
  '/cloudflare-platform-course.html',
  '/coding-agents-course.html',
  '/fanatics-collect-business-course.html',
  '/gemma-4-local-ai-course.html',
  '/genai-state-of-art-2026.html',
  '/instructure-company-course.html',
  '/kiddom-company-cto-course.html',
  '/mcp-agentic-stack-course.html',
  '/openai-realtime-course.html',
  '/rl-for-llms-course.html',
  '/voice-ai-education-course.html',
  '/wealth-planning-course.html',
  '/manifest.json'
];

// Install — cache all course files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first with background network refresh (stale-while-revalidate)
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Start a background fetch to update the cache
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed — that's fine, we'll use cache
      });

      // Return cached version immediately, or wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
