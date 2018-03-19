importScripts('/src/idb.js');
importScripts('/src/utility.js');
/*
var CACHE_STATIC_NAME = 'static-v5';
var CACHE_DYNAMIC_NAME = 'dynamic-v5';
var STATIC_FILES = [
    '/',
    '/index.html',
    '/src/main.css',
    '/src/idb.js',
    '/src/idb.js'
];

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll(STATIC_FILES);
            })
    )
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

function isInArray(string, array) {
    var cachePath;
    if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
        console.log('matched ', string);
        cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    } else {
        cachePath = string; // store the full request (for CDNs)
    }
    return array.indexOf(cachePath) > -1;
}


self.addEventListener('fetch', function (event) {

    var url = 'https://airy-scope-187507.firebaseio.com/post';
    if (event.request.url.indexOf(url) > -1) {
        event.respondWith(fetch(event.request)
            .then(function (res) {
                var clonedRes = res.clone();
                clonedRes.json()
                    .then(function (data) {
                        // for (var key in data) {
                        //     writeData('posts', data[key]); //WRITING INTO INDEXED DB
                        // }
                    });
                return res;
            })
        );
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        return response;
                    } else {
                        return fetch(event.request)
                            .then(function (res) {
                                return caches.open(CACHE_DYNAMIC_NAME)
                                    .then(function (cache) {
                                        // trimCache(CACHE_DYNAMIC_NAME, 3);
                                        cache.put(event.request.url, res.clone()); //WRITE INTO CACHE MEMORY
                                        return res;
                                    })
                            })
                            .catch(function (err) {
                                return caches.open(CACHE_STATIC_NAME)
                                    .then(function (cache) {
                                        if (event.request.headers.get('accept').includes('text/html')) {
                                            return cache.match('/offline.html');
                                        }
                                    });
                            });
                    }
                })
        );
    }
});
*/

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB58t5cXI-9x_vcEI5Hyrz08LU7XF1mI3Q",
    authDomain: "airy-scope-187507.firebaseapp.com",
    databaseURL: "https://airy-scope-187507.firebaseio.com",
    projectId: "airy-scope-187507",
    storageBucket: "airy-scope-187507.appspot.com",
    messagingSenderId: "490368607157"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

var NOTIFICATION_DATA = "";

self.addEventListener('push', function (event) {
    console.log("[sw push event: ");

    NOTIFICATION_DATA = event.data.json();

    var post = {
        id: 121,
        url: "http://127.0.0.1:8080/",
        data: NOTIFICATION_DATA
    };

    writeData("actionurl", post)
        .then(function () {
            console.log("writed data success");
        })
        .catch(function (err) {
            console.log(err);
        });

    //alert("show when push event at SW triggers");
});


// WHEN NOTIFICATION CLICKED
self.addEventListener('notificationclick', function (event) {
    var notification = event.notification;

    event.waitUntil(
        readAllData('actionurl')
            .then(function (data) {
                var p_url = data[0].url;
                clients.matchAll() //..CHECK BROWSER
                    .then(function (clis) {
                        var client = clis.find(function (c) {
                            return c.visibilityState === 'visible';
                        });
                        try {
                            if (client !== undefined) {
                                client.navigate(p_url);
                                client.focus();
                            } else {
                                clients.openWindow(p_url)
                                    .then(function (value) { console.log(value); });
                            }
                        } catch (err) {
                            console.log(err);
                        }

                    })
            })
            .catch(function (err) {
                console.log(err);
                //  openPage(event, p_url);
            })
    );
    notification.close();

});


//WHEN NOTIFICATION SWIPPED CLOSED
self.addEventListener('notificationclose', function (event) {
    console.log('Notification was closed', event);
});
