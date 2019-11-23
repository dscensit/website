/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.core.setCacheNameDetails({
    prefix: 'dsc-ensit',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'run-time',
  });

  workbox.precaching.precacheAndRoute([
  {
    "url": "images/assets/pwa/browserconfig.xml",
    "revision": "a493ba0aa0b8ec8068d786d7248bb92c"
  },
  {
    "url": "index.html",
    "revision": "c497bff6b025ce912050bafa737ddcf0"
  },
  {
    "url": "manifest.json",
    "revision": "3c6f777fd5fe4a5b1bf02e07cd2e6f56"
  },
  {
    "url": "pages/404.html",
    "revision": "5a1a5419136b21f54bb1be9c4c112ef1"
  },
  {
    "url": "pages/learn.html",
    "revision": "c32bf5b3a362d0d46cbb150636554d17"
  },
  {
    "url": "sitemap.xml",
    "revision": "136153c5d6bbf850ae66b93e506b0ee3"
  }
]);

   // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.googleapis\.com/,
      new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
     }),
    );

   // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
        }),
      ],
      }),
    ); 
    workbox.routing.registerRoute(
      new RegExp('/css/'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'css-cache',
        plugins: [
          new workbox.expiration.Plugin({
            // Only cache requests for a week
            maxAgeSeconds: 15 * 24 * 60 * 60,
            // Only cache requests.
            maxEntries: 10,
          }),
        ]
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/js/'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-cache',
        plugins: [
          new workbox.expiration.Plugin({
            // Only cache requests for a week
            maxAgeSeconds: 30 * 24 * 60 * 60,
            // Only cache requests.
            maxEntries: 14,
          }),
        ]
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/images/'),
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            // Only cache requests for a week
            maxAgeSeconds: 30 * 24 * 60 * 60,
            // Only cache 10 requests.
            maxEntries: 40,
          }),
        ]
      })
    );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}