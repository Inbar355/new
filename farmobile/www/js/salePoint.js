var address = null;
var ln;

$(function(){
	ready = 0;
    var idOfSP = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getSalePointData", idOfSalePoint: idOfSP},
        success: function(information) {
			if (information[1] != null){
				document.getElementById('updateText').innerText = "נקודת המכירה פעילה";
				document.getElementById('activeSalePoint').checked = true;
				var date = information[1].split("-");
				document.getElementById('dateInput').innerText = date[2] + "." + date[1] + "." + date[0];
				var time1 = information[2].split(":");
				var time2 = information[3].split(":");
				document.getElementById('timeInput').innerText =time1[0] + ":" + time1[1] + " - " +  time2[0] + ":" + time2[1];	
			}
			else{
				document.getElementById('activeSalePoint').disabled = true;
				document.getElementById('updateText').innerText = "נקודת המכירה אינה פעילה";
				document.getElementById('dateInput').innerText = "אין תאריך למכירה זו";
				document.getElementById('timeInput').innerText = "אין שעות למכירה זו";
			}
			
			address = information[0];
            document.getElementById('addressInput').innerText =information[0];
			
            if (information[4] == null){
                document.getElementById('pointComment').style.display = "none";
                document.getElementById('notes').style.display = "none";
            }
            else{
                document.getElementById('pointComment').innerText = information[4];
            }
            var btn = document.getElementById('btnAnimate');
            btn.classList.add('horizTranslate');
        },
        error: function(lo){   console.log("error" + lo.message);
        alert (lo);}
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
    document.body.appendChild(centerControlDiv);

    setText();
});

function setPushMsg(){
    //check if the user already signed - else he need to sign in
    //change the owner to the uniqe id
    var idOfSP = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getNotificationToSalePoint", idOfPage: idOfSP, owner: "1A2S3D4F5F"},
        error: function (error) {
            console.error("Failed to get ajax response : " + error);
        },
        success: function(signed) {
            alert (signed);
            if (signed === true.trim() ){
                alert ("sssss")
            }
            else{
                alert (signed/* + "אינך מחובר למערכת. אם ברוצנ לקבל התראות נא התחבר/הרשם"*/);
                //change the button to sign in
            }
        }
    });
}

function init() {
	ln = launchnavigator;
    platform = device.platform.toLowerCase();
    if(platform == "android"){
        platform = ln.PLATFORM.ANDROID;
    }else if(platform == "ios"){
        platform = ln.PLATFORM.IOS;
    }else if(platform.match(/win/)){
        platform = ln.PLATFORM.WINDOWS;
    }
}

function navigate(){
	if(address != null){
		var opts = {
			app: ln.APP.WAZE,
			enableDebug: true,
		};
		ln.navigate(address, opts);
	}
	else{
		alert("לא ניתן לנווט לנקודת מכירה אשר אינה פעילה");
	}
}

function faceBookShare() {
    alert("shring..");
}

function calendar(){
	/*
	var options = {
	url: 'https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin',
	calendarName: calendarName, // iOS specific
	calendarId: 1 // Android specific
	};
	var startDate = new Date(2017,8,29,18,30,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(2017,8,29,19,30,0,0,0);
  var title = "My nice event";
  var location = "Home";
  var notes = "Some notes about this event.";
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };
  window.plugins.calendar.createEventWithOptions(title, location, notes, startDate, endDate, options, success, error);*/

}

$(document).on("deviceready", init);