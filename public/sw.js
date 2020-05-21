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

workbox.setConfig({
  debug: true,
});

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.core.setCacheNameDetails({
    prefix: 'dsc-ensit',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'run-time',
    googleAnalytics: 'ga',
  });

  workbox.precaching.precacheAndRoute([
  {
    "url": "css/bootstrap.min.css",
    "revision": "d69866cbf97f95ab81948406f7d2c5ac"
  },
  {
    "url": "css/error.css",
    "revision": "7c2550dda85fee8fa4bbdb5530763601"
  },
  {
    "url": "css/fontawesome.v5.2.0.css",
    "revision": "46ee5b0c32c2b0c3a005e4b7dcf60a7c"
  },
  {
    "url": "css/ionicons.min.css",
    "revision": "7b9562f0ed331aada08c31163ee522a4"
  },
  {
    "url": "css/owl.carousel.min.css",
    "revision": "874c664368128b6ab99802737ed00edc"
  },
  {
    "url": "css/responsive.css",
    "revision": "964ab86cec17408e7ea835cc90c56b0f"
  },
  {
    "url": "css/styles.css",
    "revision": "bb3598340c82e0bdb5047a6d79b388b6"
  },
  {
    "url": "images/assets/pwa/favicon.ico",
    "revision": "cbd7238c2706caee140755a3c4042ca3"
  },
  {
    "url": "images/assets/pwa/safari-pinned-tab.svg",
    "revision": "d2df143b9fe7d4ac17b516ab1d4dd73b"
  },
  {
    "url": "images/favicon.ico",
    "revision": "cbd7238c2706caee140755a3c4042ca3"
  },
  {
    "url": "index.html",
    "revision": "9388447285273ff492f12c00dc426900"
  },
  {
    "url": "js/custom.js",
    "revision": "047b68706eb0e35e3cddb0fe62911322"
  },
  {
    "url": "js/member.js",
    "revision": "baec20577e88e3c932d4ff93e9d4d8cc"
  },
  {
    "url": "js/vendors/bootstrap.bundle.min.js",
    "revision": "b41fe9374205bd087a4d4f0ab5a195be"
  },
  {
    "url": "js/vendors/hammer.js",
    "revision": "90fa272de2246bcef190bca898737f30"
  },
  {
    "url": "js/vendors/jquery.easing.min.js",
    "revision": "e2d41e5c8fed838d9014fea53d45ce75"
  },
  {
    "url": "js/vendors/jquery.magnific-popup.min.js",
    "revision": "b37d7edf99565d3858eaa1ad80df3cff"
  },
  {
    "url": "js/vendors/jquery.min.js",
    "revision": "2f772fed444d5489079f275bd01e26cc"
  },
  {
    "url": "js/vendors/owl.carousel.min.js",
    "revision": "47c357c05cb99cedbac2874840319818"
  },
  {
    "url": "js/vendors/pace.js",
    "revision": "04f3adcdd7438ed782f5e2015161c375"
  },
  {
    "url": "js/vendors/swiper.min.js",
    "revision": "65ec366943a50289ae2088801c635c85"
  },
  {
    "url": "pages/404.html",
    "revision": "b8606483df4fed3e9fd9937c1071c038"
  },
  {
    "url": "pages/learn.html",
    "revision": "67261f04b2177a7277553944ceaf2f5e"
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
          purgeOnQuotaError: true,
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
            purgeOnQuotaError: true,
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
            purgeOnQuotaError: true,
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
            purgeOnQuotaError: true,
          }),
        ]
      })
    );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  /\/api\/.*\/*.json/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);
