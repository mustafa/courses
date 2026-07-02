const CACHE_NAME = 'mustafa-courses-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/Iceland_Driving_Guide.html',
  '/agent-tracing-observability-course.html',
  '/ai-agents-production-course.html',
  '/ai-evals-measurement-course.html',
  '/ai-infrastructure-at-scale-course.html',
  '/ai-native-product-building-course.html',
  '/ai-product-strategy-edtech-course.html',
  '/bending-spoons-course.html',
  '/claims-system-architecture-course.html',
  '/claude-agent-network-course.html',
  '/claude-agent-sdk-course.html',
  '/cloudflare-platform-course.html',
  '/coding-agents-course.html',
  '/cybersecurity-tech-leaders-course.html',
  '/data-engineering-analytics-course.html',
  '/engineering-leadership-course.html',
  '/executive-communication-course.html',
  '/fanatics-collect-business-course.html',
  '/gemma-4-local-ai-course.html',
  '/genai-state-of-art-2026.html',
  '/instructure-company-course.html',
  '/kiddom-company-cto-course.html',
  '/mcp-agentic-stack-course.html',
  '/openai-realtime-course.html',
  '/pe-playbook-tech-course.html',
  '/personal-finance-advanced-course.html',
  '/platform-engineering-course.html',
  '/rl-for-llms-course.html',
  '/system-design-at-scale-course.html',
  '/voice-ai-education-course.html',
  '/wealth-planning-course.html',
  '/manifest.json'
];

// Install — cache assets individually so one failure doesn't break everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => {
            console.warn('SW: failed to cache', url, err);
          })
        )
      )
    ).then(() => self.skipWaiting())
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

// Fetch — network-first with cache fallback (fixes stale-cache navigation failures)
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Cache successful responses in the background
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed — fall back to cache
        return caches.match(event.request);
      })
  );
});
