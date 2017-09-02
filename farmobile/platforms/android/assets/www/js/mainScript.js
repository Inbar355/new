function geocodeAddress(resultsMap, geocoder) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setZoom(15);
            resultsMap.setCenter(results[0].geometry.location);
        } else {
            alert(': הכתובת שגויה, נא הכנס כתובת חדשה');
        }
    });
}


function onSuccess(position) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: position.coords.latitude , lng: position.coords.longitude},
        mapTypeControl: false
    });
	initPage(map);	
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 32.080633 , lng: 34.789022},
        mapTypeControl: false
    });
	initPage(map);	
}

function initPage(map){
	$.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"mainMarkers"},
        success: function(location) {
            for(var i=0; i<location.length; i++) {
                var coords = location[i].split("-");
                var latLng = new google.maps.LatLng(coords[0], coords[1]);
                var marker = new google.maps.Marker({
                    id: location[i],
                    position: latLng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: "img/pepper.png"
                });
                google.maps.event.addListener(marker, 'click', function() {
                    if (this.getAnimation() != null) {
                        this.setAnimation(null);
                    } else {
                        this.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    marker = this.id;
                    setTimeout(function () {
                        window.location.href = "salePoint.html"+ "?id=" + marker;
                    }, 900)
                });
            }
        },
        error: function(lo){   console.log("error" + lo.message);}
    });
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function(){
        geocodeAddress(map, geocoder);
    });
    var centerControlDiv = document.createElement('button');
    centerControlDiv.className="btn-block";
    centerControlDiv.id="upperButton";
    centerControlDiv.disabled = true;
	
    var menuButton = document.createElement('button');
    menuButton.id = "menu";
    menuButton.addEventListener('click', function() {
        openNav();
    });
    centerControlDiv.appendChild(menuButton);

    var rightLogo = document.createElement('button');
    rightLogo.disabled = true;
    rightLogo.id = "rightLogo";
    centerControlDiv.appendChild(rightLogo);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

    setText();
}


function initMap() {
	//navigator.geolocation.getCurrentPosition(onSuccess, onError);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 32.080633 , lng: 34.789022},
        mapTypeControl: false
    });
    initPage(map);
}

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function changeButtons() {
    //check if signed in otherwise ask for login
    $($("#requestPointZone")).empty().append(
            '<input  id= "requiredAddress" type="text" class="form-control"  placeholder=": הכנס עיר מבוקשת" >'+
			'<input  id= "name" type="text" class="details"  placeholder=": שם" >'+
			'<input  id= "phone" type="text" class="details"  placeholder=": טלפון" >'+
            '<div class="sendCloseConatiner" display="flex">' +
            '<button type="button" id="close" class="btn btn-danger" onclick="backToRequestPointBtn()">סגור</button>' +
            '<button type="button" id="send" class="btn btn-info" onclick="sendAddress()">שלח</button>' +
            '</div>'
        );
    document.getElementById('map').style.height = '80%';
}

function backToRequestPointBtn() {
    $($("#requestPointZone")).empty().append(
        '<button class="btn btn-info btn-block bigButton" onclick="changeButtons()" id="choiceList">הזמן נקודת מכירה</button>');
    document.getElementById('map').style.height = '100%';
}

function checkForCityValidation(data) {
/*    if (data.length > 20){
        return false;
    }*/
/*    console.log( String.includes(data ,["files/cities"]));
    return false;*/
};

function sendAddress() {
    //check city validation
    var data = document.getElementById("requiredAddress").value;
    if (checkForCityValidation (data)){
        $.ajax({
            url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
            data: {requestType :"sendNewAddress", newAddress: data},
            success: function() {
                alert ("הבקשה נשלחה בהצלחה.");
                backToRequestPointBtn();
            },
            error: function(lo){
                alert('Please try again.');
                console.log(lo);
            }
        });
    }
    else{
        alert ("הבקשה לא נשלחה, נא לכתוב שוב את העיר המבוקשת בלבד. אם הודעה זו חוזרת מספר פעמים, נא עדכנו אותנו בפייסבוק.");
    }
}