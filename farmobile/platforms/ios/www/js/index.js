var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.setupPush();
    },
    setupPush: function () {

        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        push.on('registration', function (data) {
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
                AjaxInserUserUUIDToDB(data.registrationId);
            }
        });

        push.on('error', function (e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function (data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
        });
    }
};


function AjaxInserUserUUIDToDB (AT){
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        timeout: 3000,
        data: {requestType :"asignUUID-AT", uuid: device.uuid, accessToken: AT, platform: device.platform},
        success: function(ret) {
            console.log("assigned ");
        },
        error: function(lo){
            console.log("Error - " + lo);
        }
    });
}