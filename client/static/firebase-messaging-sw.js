/* eslint-disable */ 
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js');

firebase.initializeApp({
	apiKey: "AIzaSyDXvRmxoN4zPl_aF0vi1Y3sdXd6YNjCNdI",
    authDomain: "snkrs98-31be3.firebaseapp.com",
    databaseURL: "https://snkrs98-31be3.firebaseio.com",
    projectId: "snkrs98-31be3",
    storageBucket: "snkrs98-31be3.appspot.com",
    messagingSenderId: "1013642204837",
    appId: "1:1013642204837:web:0e392919c105fc74dcdf4c",
    measurementId: "G-X0B47XDC6M"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    console.log("message input  :  " +   payload);
    // Customize notification here
    const data = payload.data;
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: data.icon
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        event.waitUntil(self.clients.openWindow(data.release_url));
    });
});