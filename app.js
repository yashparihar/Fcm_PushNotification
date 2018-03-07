var swRegistration = "";
myStorage = window.localStorage;

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .then(function (swReg) {
			document.getElementById("sw").innerHTML = swReg;
            console.log('Service Worker is registered', swReg);
            swRegistration = swReg;
        })
}


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBsU36aBbWpUqtRkB72PFfZmpBJG7bB8DM",
    authDomain: "wager-61770.firebaseapp.com",
    databaseURL: "https://wager-61770.firebaseio.com",
    projectId: "wager-61770",
    storageBucket: "wager-61770.appspot.com",
    messagingSenderId: "626308378147"
};
firebase.initializeApp(config);

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

document.getElementById("messaging").innerHTML = messaging;

//REGISTER FIREBASE MESSAGING SERVICE WITH EXISTING SERVICE WORKER
navigator.serviceWorker.getRegistrations()
    .then(function (swreg) {
        console.log(swreg);
        messaging.useServiceWorker(swreg[0]); //TELLING FIREBASE CLOUD MESSAGE TO USE THIS SERVICE WORKER

        // Callback fired if Instance ID token is updated.
        // messaging.onTokenRefresh(function () {
        //     messaging.getToken()
        //         .then(function (refreshedToken) {
        //             console.log('Token refreshed.');
        //             console.log(token);
        //
        //         })
        //         .catch(function (err) {
        //             console.log('Unable to retrieve refreshed token ', err);
        //             showToken('Unable to retrieve refreshed token ', err);
        //         });
        // });


        messaging.requestPermission()  //REQUESTING PERMISSION FOR SENDING NOTIFICATION
            .then(function () {
                console.log("got permission");
               // displayConfirmNotification();

                return messaging.getToken();
            })
            .then(function (token) {
                console.log(token);
                 document.getElementById("token").innerHTML = token;
				 document.getElementById("status").innerHTML = "success";
                //HERE KEY WOULD BE USER ID InSTEAD OF NOTIFICATION_TOKEN
                if (myStorage.getItem('notification_token') == token ){
                    console.log("similiar token"+myStorage.getItem('notification_token'));

                } else {
                    console.log("New token");
                    myStorage.setItem('notification_token', token);
                    //SEND IT TO SERVER FOR UPDATION
                }
                //CHECK IF TOKEN ALREADY IN LOCAL MEMORY
                //IF THIS TOKEN AND STORED TOKEN ARE SAME.. RETURN
                // ELSE .. UPDATE THE TOKEN IN LOCAL STORAGE AND SEND NEW TOKEN TO API

            })
            .catch(function () {
				document.getElementById("status").innerHTML = "failed";
                console.log("error");
            })

    })


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
            renotify: true,
            actions: [
                { action: 'confirm', title: 'Okay', icon: 'src/pic.png' },
                { action: 'cancel', title: 'Cancel', icon: 'src/pic.png' }
            ]
        };

        navigator.serviceWorker.ready
            .then(function(swreg) {
                swreg.showNotification('Successfully subscribed!', options);
            });
    }
}



// [START receive_message]
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function (payload) {
	document.getElementById("payload").innerHTML = payload;
    console.log("Message received. ", payload);
    displayConfirmNotification();
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    // appendMessage(payload);
});
// [END receive_message]