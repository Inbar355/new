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
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"farmobileproject","ecb":"app.onNotificationGCM"});
	},
	successHandler: function(result) {
    alert('Callback Success! Result = '+result)
	},
	errorHandler:function(error) {
    alert(error);
	},
	onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }
	
	
	
	/*
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
        });*/
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