//var deferredPrompt;

// if (!window.Promise) {
//     window.Promise = Promise;
// }

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
            .register("./sw.js")
            .then(function () {
                console.log("Service Worker Registered");
            });

    navigator.serviceWorker.ready
        .then(function (swreg) {
            reg = swreg;
            console.log(reg);
           // swreg.pushManager.
           //            return swreg.pushManager.getSubscription(); //GET SUBSCRITIONS
        });
}

/*
//..................................
var NotificationsButtons = document.getElementById("enable_notification");



function displayConfirmNotification() {
    if ('serviceWorker' in navigator) {
        var options = {
            body: 'You successfully subscribed to our Notification service!',
            // icon: '/src/images/icons/app-icon-96x96.png',
            // image: '/src/images/sf-boat.jpg',
            dir: 'ltr',
            lang: 'en-US', // BCP 47,
            vibrate: [100, 50, 200],
            //    badge: '/src/images/icons/app-icon-96x96.png',
            tag: 'confirm-notification',
            renotify: true
            // actions: [
            //     {action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png'},
            //     {action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png'}
            // ]
        };

        navigator.serviceWorker.ready
            .then(function (swreg) {
                swreg.showNotification('Successfully subscribed!', options);
            });
    }
}



function configurePushSub() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    var reg;
    navigator.serviceWorker.ready
        .then(function (swreg) {
            reg = swreg;
            return swreg.pushManager.getSubscription(); //GET SUBSCRITIONS
        }) //   RETURNS SUBSCRIPTIONS
        .then(function (sub) {
            console.log("fresh sub: "+sub);
            if (sub === null) {
                // Create a new subscription
                var vapidPublicKey = 'BKapuZ3XLgt9UZhuEkodCrtnfBo9Smo-w1YXCIH8YidjHOFAU6XHpEnXefbuYslZY9vtlEnOAmU7Mc-kWh4gfmE';
                var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey
                });
            } else {
                // We have a subscription
            }


        }) //STORE THAT SUBSCRIPTION IN SERVER END
        .then(function (newSub) {
            console.log("after config sub: "+newSub);
            return fetch('https://airy-scope-187507.firebaseio.com/subpost.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSub)
            })
        })
        .then(function (res) {
            console.log("after subs done:"+res);
            if (res.ok) {
                displayConfirmNotification();
            }
            return res.json();
        })
        .then(function (data) { console.log(data);

        })
        .catch(function (err) {
            console.log(err);
        });
}



function askForNotificationPermission() {
    Notification.requestPermission(function (result) {
        console.log('User Choice', result);
        if (result !== 'granted') {
            console.log('No notification permission granted!');
        } else {
            configurePushSub();
            //  displayConfirmNotification();
        }
    });
}

if ('Notification' in window && 'serviceWorker' in navigator) {
    NotificationsButtons.addEventListener('click', askForNotificationPermission);

}

*/
