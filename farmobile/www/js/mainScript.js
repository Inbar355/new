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
        zoom: 12,
        center: {lat: position.coords.latitude , lng: position.coords.longitude},
        mapTypeControl: false
    });
	initPage(map);	
}

function onError(error) {
	var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 32.01 , lng: 34.789022},
        mapTypeControl: false
    });
	initPage(map);
}

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError,{timeout:250});
    } else {
        onError();
    }
 }

function initPage(map){
	$.ajax({
		url: "http://45.56.108.79:8080/APPserver/clientServlet",
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
    $('#address').keyup(function() {if (event.keyCode == 13) {geocodeAddress(map, geocoder); }});
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

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function changeForAskButton() {
    $($("#requestPointZone")).empty().append('<img id="smallTrack" src="img/inviteSalePoint.png" onclick="backToRequestPointBtnAndCheck()" >');
    document.getElementById('map').style.height = '100%';
}

function changeButtons() {
    //check if signed in otherwise ask for login
    $($("#requestPointZone")).empty().append(
            '<input  id= "requiredAddress" type="text" class="form-control"  placeholder=": הכנס יעד מבוקש" >'+
			'<input  id= "name" type="text" class="details"  placeholder=": שם" >'+
			'<input  id= "phone" type="text" class="details"  placeholder=": טלפון" >'+
            '<div class="sendCloseConatiner" display="flex">' +
            '<button type="button" id="close" class="btn btn-danger " style="font-family: Felix007, serif;"  onclick="changeForAskButton()">סגור</button>' +
            '<button type="button" id="send" class="btn btn-info askButtons" onclick="sendAddress()">שלח</button>' +
            '</div>'
        );

    document.getElementById('map').style.height = '80%';
}

function backToRequestPointBtnAndCheck() {
    $($("#requestPointZone")).empty().append(' <button class="btn btn-warning btn-block bigButton" onclick="changeButtons()" id="orderButton">הזמן נקודת מכירה</button>'
	+ '<button class="" onclick="changeForAskButton()" id = "closeBtn" >X</button>');
    document.getElementById('map').style.height = '93%';
}

function deleteLastChar() {
    $('#phone').val(
        function(index, value){
            return value.substr(0, value.length - 1);
        })
}

function backToRequestPointBtn() {
    $($("#requestPointZone")).empty();
    document.getElementById('map').style.height = '100%';
}

function sendAddress() {
    //check city validation
    var data = document.getElementById("requiredAddress").value;
    var phoneNumber = document.getElementById("phone").value;
    var name = document.getElementById("name").value;

    if (checkValues(data, phoneNumber, name) ){
        $.ajax({
            url: "http://45.56.108.79:8080/APPserver/clientServlet",
            data: {requestType :"sendNewAddress", newAddress: data, name: name,phone: phoneNumber },
            success: function() {
                alert ("הבקשה נשלחה בהצלחה.ניתן לשלוח בקשה אחת בלבד בכל הפעלה של האפקליציה.");
                backToRequestPointBtn();
            },
            error: function(lo){
                alert('אירעה שגיאה, נא נסה שוב');
                console.log(lo);
            }
        });
    }
}

function checkValues(data, phone, name) {
    if (data.length > 50){
        alert("לא ניתן להכניס יותר מ50 תווים לבקשה");
        return false;
    }
    else if (name.length > 20) {
        alert("השם חייב להיות לכל היותר באורך 20 תווים");
        return false;
    }
    else if (phone.length != 10) {
        alert("נא להכניס מספר בן 10 ספרות בדיוק");
        return false;
    }
    else if (data.length  < 2){
        alert("נא הכנס יעד מבוקש");
        return false;
    }
    else if (name.length < 2) {
        alert("נא הכנס שם תקין ליצירת קשר");
        return false;
    }
    else if (phone.length < 10) {
        alert("נא הכנס מספר טלפון תקין ליצירת קשר");
        return false;
    }
    return true;
}