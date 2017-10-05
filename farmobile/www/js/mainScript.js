function geocodeAddress(resultsMap, geocoder) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setZoom(15);
            resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				position: results[0].geometry.location,
				map: resultsMap,
				animation: google.maps.Animation.DROP,
				icon: "img/address.png"
			});
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
	
    if (navigator.geolocation) 
		navigator.geolocation.getCurrentPosition(onSuccess, onError,{timeout:250});
    else 
		onError();

    onError();

 }

function initPage(map){
	$.ajax({
		url: "http://45.56.108.79:8080/APPserver/clientServlet",
        data: {requestType :"mainMarkers"},
        success: function(location) {
			console.log(location);
            for(var i=0; i<location.length; i++) {
                var data = location[i].split(",");
				var coords = data[1].split("-");
                var latLng = new google.maps.LatLng(coords[0], coords[1]);
				var active = 0;
				if(data[0] != null)
				{
					var salePointDate = data[0].split(".");
					var currentDate = new Date();
					if (currentDate.getFullYear() <= salePointDate[2] && currentDate.getMonth() + 1 <= salePointDate[1] && currentDate.getDate() <= salePointDate[0]){
						active = 1;
						addActiveMarker(map, latLng, data[1], i * 350);
					}
				}
				if (active == 0)
					addNonActiveMarker(map, latLng, data[1],  i * 350);
			}
		},
        error: function(lo){   console.log("error" + lo.message);}
    });
    geocoder = new google.maps.Geocoder();
	document.getElementById("search_button").onclick  = function(){
		geocodeAddress(map, geocoder);
	};
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

function addActiveMarker(map, position, id, timeout){
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
		id: id,
		position: position,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "img/red_pepper.png"
		});
		google.maps.event.addListener(marker, 'click', function() {
			if (this.getAnimation() != null) 
				this.setAnimation(null);
			else 
				this.setAnimation(google.maps.Animation.BOUNCE);
                    
			setTimeout(function () {
				window.location.href = "salePoint.html"+ "?id=" + id;
			}, 2000)
		});	
	}, timeout);
}

function addNonActiveMarker(map, position, id, timeout){
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
		id: id,
		position: position,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "img/green_pepper.png"
		});
		google.maps.event.addListener(marker, 'click', function() {
			if (this.getAnimation() != null) 
				this.setAnimation(null);
			else 
				this.setAnimation(google.maps.Animation.BOUNCE);
                    
			setTimeout(function () {
				window.location.href = "salePoint.html"+ "?id=" + id;
			}, 2000)
		});	
	}, timeout);
}

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function deleteLastChar() {
    $('#phone').val(
        function(index, value){
            return value.substr(0, value.length - 1);
        })
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