var firstCoordinate;
var secondCoordinate;

$(function(){
	ready = 0;
    var idOfSP = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getSalePointData", idOfSalePoint: idOfSP},
        success: function(information) {
            console.log("db" + information);
            document.getElementById('addressInput').innerText =information[0];
			var place = idOfSP.split("-");
			firstCoordinate = place[0];
			secondCoordinate = place[1];
            var date = information[1].split("-");
            document.getElementById('dateInput').innerText = date[2] + "." + date[1] + "." + date[0];
			var time1 = information[2].split(":");
			var time2 = information[3].split(":");
            document.getElementById('timeInput').innerText =time1[0] + ":" + time1[1] + " - " +  time2[0] + ":" + time2[1];
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
        //url: "clientServlet",
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

function onSuccess(position) {
	alert("onSuccess");
	var dest = firstCoordinate + "-" + secondCoordinate;
	launchnavigator.navigate(dest, {
        enableDebug: true
    });
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}


function navigate(){
	alert("nevigate");
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function faceBookShare() {
    alert("shring..");


}