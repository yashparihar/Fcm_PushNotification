// // Import and configure the Firebase SDK
// // These scripts are made available when the app is served or deployed on Firebase Hosting
// // If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// // importScripts('/__/firebase/4.8.1/firebase-app.js');
// // importScripts('/__/firebase/4.8.1/firebase-messaging.js');
// // importScripts('/__/firebase/init.js');
// //
// // const messaging = firebase.messaging();
//
//
//  //* Here is is the code snippet to initialize Firebase Messaging in the Service
//  //* Worker when your app is not hosted on Firebase Hosting.
//
//  // [START initialize_firebase_in_sw]
//  // Give the service worker access to Firebase Messaging.
//  // Note that you can only use Firebase Messaging here, other Firebase libraries
//  // are not available in the service worker.
//  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
//  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//
//  // Initialize the Firebase app in the service worker by passing in the
// //  // messagingSenderId.
// //  firebase.initializeApp({
// //      apiKey: "AIzaSyB58t5cXI-9x_vcEI5Hyrz08LU7XF1mI3Q",
// //      authDomain: "airy-scope-187507.firebaseapp.com",
// //      databaseURL: "https://airy-scope-187507.firebaseio.com",
// //      projectId: "airy-scope-187507",
// //      storageBucket: "airy-scope-187507.appspot.com",
// //      messagingSenderId: "490368607157"
// //  });
// //
// //  // Retrieve an instance of Firebase Messaging so that it can handle background
// //  // messages.
// //  const messaging = firebase.messaging();
// //  // [END initialize_firebase_in_sw]
// //
// //
// //
// // // If you would like to customize notifications that are received in the
// // // background (Web app is closed or not in browser focus) then you should
// // // implement this optional method.
// // // [START background_handler]
// // messaging.setBackgroundMessageHandler(function(payload) {
// //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
// //   // Customize notification here
// //   const notificationTitle = 'Background Message Title';
// //   const notificationOptions = {
// //     body: 'Background Message body.',
// //     icon: ''
// //   };
// //
// //   return self.registration.showNotification(notificationTitle,
// //       notificationOptions);
// // });
// // // [END background_handler]
// //
// //
//
// //
// // importScripts('/src/js/idb.js');
// // importScripts('/src/js/utility.js');
//
// var CACHE_STATIC_NAME = 'static-v1';
// var CACHE_DYNAMIC_NAME = 'dynamic-v1';
// var STATIC_FILES = [
//     '/',
//     '/index.html',
//     '/src/main.css'
// ];
//
//
// self.addEventListener('install', function (event) {
//     console.log('[Service Worker] Installing Service Worker ...', event);
//     event.waitUntil(
//         caches.open(CACHE_STATIC_NAME)
//             .then(function (cache) {
//                 console.log('[Service Worker] Precaching App Shell');
//                 cache.addAll(STATIC_FILES);
//             })
//     )
// });
//
// self.addEventListener('activate', function (event) {
//     console.log('[Service Worker] Activating Service Worker ....', event);
//     event.waitUntil(
//         caches.keys()
//             .then(function (keyList) {
//                 return Promise.all(keyList.map(function (key) {
//                     if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
//                         console.log('[Service Worker] Removing old cache.', key);
//                         return caches.delete(key);
//                     }
//                 }));
//             })
//     );
//     return self.clients.claim();
// });
//
// function isInArray(string, array) {
//     var cachePath;
//     if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
//         console.log('matched ', string);
//         cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
//     } else {
//         cachePath = string; // store the full request (for CDNs)
//     }
//     return array.indexOf(cachePath) > -1;
// }
//
//
// self.addEventListener('fetch', function (event) {
//
//     var url = 'https://airy-scope-187507.firebaseio.com/post';
//     if (event.request.url.indexOf(url) > -1) {
//         event.respondWith(fetch(event.request)
//             .then(function (res) {
//                 var clonedRes = res.clone();
//                 clonedRes.json()
//                     .then(function(data) {
//                         // for (var key in data) {
//                         //     writeData('posts', data[key]); //WRITING INTO INDEXED DB
//                         // }
//                     });
//                 return res;
//             })
//         );
//     } else if (isInArray(event.request.url, STATIC_FILES)) {
//         event.respondWith(
//             caches.match(event.request)
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request)
//                 .then(function (response) {
//                     if (response) {
//                         return response;
//                     } else {
//                         return fetch(event.request)
//                             .then(function (res) {
//                                 return caches.open(CACHE_DYNAMIC_NAME)
//                                     .then(function (cache) {
//                                         // trimCache(CACHE_DYNAMIC_NAME, 3);
//                                         cache.put(event.request.url, res.clone()); //WRITE INTO CACHE MEMORY
//                                         return res;
//                                     })
//                             })
//                             .catch(function (err) {
//                                 return caches.open(CACHE_STATIC_NAME)
//                                     .then(function (cache) {
//                                         if (event.request.headers.get('accept').includes('text/html')) {
//                                             return cache.match('/offline.html');
//                                         }
//                                     });
//                             });
//                     }
//                 })
//         );
//     }
// });
//
//
//
//
