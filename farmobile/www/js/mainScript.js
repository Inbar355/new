var markers = []
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

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function onSuccess(position) {
	var distance = getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, 32.01, 34.789022);
	var zoomByDistance;
	if (distance > 15)
		zoomByDistance = 10;
	else
		zoomByDistance = 12;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomByDistance,
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
     navigator.geolocation.getCurrentPosition(onSuccess, onError,{timeout:1250});
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
                var data = location[i].split(",");
				var coords = data[3].split("-");
                var latLng = new google.maps.LatLng(coords[0], coords[1]);
				if(data[0] != null)
				{
					if (checkIfSalePointActive(data[0], data[1], data[2]))
						addActiveMarker(map, latLng, data[3], i * 350);
					else
						addNonActiveMarker(map, latLng, data[3],  i * 350);
				}
			}
		},
        error: function(lo){   console.log("error" + lo.message);}
    });
    geocoder = new google.maps.Geocoder();
	document.getElementById("search_button").onclick  = function(){
		geocodeAddress(map, geocoder);
	};
	
	$("#address").keyup(function(event){
		if(event.keyCode == 13){
			$("#search_button").click();
		}
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

function shareViaWhatsapp() {
	try {
		var  message = 'הורדתי הרגע את האפליקציה המדהימה של פארמוביל שמגיעים עד לשכונה עם מכירה ישירה של תוצרת חקלאית סופר טריה! מומלץ בחום!';
		var url= 'https://play.google.com/store/apps/details?id=com.phonegap.Farmobile';

		var onSuccess = function (result) {
			alert("שיתפת בהצלחה את הנקודה הנוכחית !");
		};

		var onError = function (msg) {
		};

		window.plugins.socialsharing.shareViaWhatsApp(message, null, url, onSuccess, onError);
	}
	catch (e){
		console.log(e);
	}
}

function addActiveMarker(map, position, id, timeout){
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
		id: id,
		color: "red",
		position: position,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "img/pepper.png",
		});
		markers.push(marker);
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
		color: "yellow",
		map: map,
		animation: google.maps.Animation.DROP,
		icon: "img/yellow_pepper.png"
		});
		markers.push(marker);
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

function filterSalePointByState(colorOfPepper){
	for(var i = 0; i < markers.length; i++)
	{
		if(markers[i].color != colorOfPepper)
            markers[i].setVisible(false);
        
		else
			markers[i].setVisible(true);
	}
}

function deleteLastChar() {
    $('#phone').val(
        function(index, value){
            return value.substr(0, value.length - 1);
        })
}

function shareFacebook(){
	alert("אנא המתן, משתף");
	var options = {
		method: "share",
		href: "https://play.google.com/store/apps/details?id=com.phonegap.Farmobile",
		hashtag: '#המהפכההתחילה',
		quote: "גם אני קניתי ותמכתי במהפכה של פארמוביל ! הורידו את האפליקציה החדשה שלנו עכשיו לאדנרואיד ואייפון!",
		share_feedWeb: true // iOS only
	};

	function  onSuccess () {
		setTimeout(function () {
			$(".background").empty().append('<img src="img/back.jpg" width="100%" style="height: -webkit-fill-available;"/>');
		}, 200);
	}

	function  onError (error) {
		setTimeout(function () {
			$(".background").empty().append('<img src="img/back.jpg" width="100%" style="height: -webkit-fill-available;"/>');
		}, 10);
	}
	facebookConnectPlugin.showDialog(options,  onSuccess,  onError);
}