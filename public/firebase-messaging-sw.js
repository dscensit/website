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
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  },
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
    "revision": "2d182d0a4451f03d66f249fac186f664"
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
    "revision": "42029846c9ecc0b4d9997a07f066ef47"
  },
  {
    "url": "pages/technologies.html",
    "revision": "8eecf6112103f28b7e2f35c08a1bdf18"
  },
  {
    "url": "pages/workshops.html",
    "revision": "5f303ee67b85de2fe4a2f49550049691"
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

importScripts('/__/firebase/7.14.5/firebase-app.js');
importScripts('/__/firebase/7.14.5/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: 'api-key',
   authDomain: 'project-id.firebaseapp.com',
   databaseURL: 'https://project-id.firebaseio.com',
   projectId: 'project-id',
   storageBucket: 'project-id.appspot.com',
   messagingSenderId: 'sender-id',
   appId: 'app-id',
   measurementId: 'G-measurement-id',
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END background_handler]