var address = null;
var ln;
var currentRating;

$(function(){
	setTimeout(function () {
		$(".background").empty().append('<img src="img/back.jpg" width="100%" style="height: -webkit-fill-available;"/>');
	}, 600);
    var idOfSP = getUrlVars()["id"];
    $.ajax({
		url: "http://45.56.108.79:8080/APPserver/clientServlet",
        data: {requestType :"getSalePointData", idOfSalePoint: idOfSP},
        success: function(information) {
			console.log(information);
			var flag = 1;
			
			if (information[1] != null){
				var date = information[1].split("-");
				var currentDate = new Date();
				if(currentDate.getFullYear() <= date[0] && currentDate.getMonth() + 1 <= date[1] && currentDate.getDate() <= date[2])
				{
					flag = 0;
					document.getElementById('updateText').innerText = "נקודת המכירה פעילה";
					document.getElementById('activeSalePoint').checked = true;
					document.getElementById('dateInput').innerText = date[2] + "." + date[1] + "." + date[0];
					var time1 = information[2].split(":");
					var time2 = information[3].split(":");
					document.getElementById('timeInput').innerText =time1[0] + ":" + time1[1] + " - " +  time2[0] + ":" + time2[1];
				}
			}
			if(flag){
				document.getElementById('activeSalePoint').disabled = true;
				document.getElementById('updateText').innerText = "נקודת המכירה אינה פעילה";
				document.getElementById('dateInput').innerText = "אין תאריך למכירה זו";
				document.getElementById('timeInput').innerText = "אין שעות למכירה זו";
			}
			
			address = information[0];
            document.getElementById('addressInput').innerText =information[0];
			information[8] == 0 ? document.getElementById('rankInput').innerText = 0 
			: document.getElementById('rankInput').innerText = Math.round(information[7]/information[8]);
			
            if (information[4] == null){
                document.getElementById('pointComment').style.display = "none";
                document.getElementById('notes').style.display = "none";
            }
            else{
                document.getElementById('pointComment').innerText = information[4];
            }
			if(information[6] != "")
			{
				var produce = information[6].split(",");
				for(var i = 0; i < produce.length; i++){
					var id = produce[i];
					var container = document.createElement('div');
					container.className = "contain col-xs-3";
					var img = document.createElement('img');
					img.id = id;
					var str = "img/" +  img.id + ".jpg";
					img.src = str;
					img.className = "imgClass";
					img.onclick = function() { window.location.href = "specificProduceInfo.html"+ "?id=" + this.id; };
					container.appendChild(img);
					document.body.appendChild(container);
					if (i%1 ==0 || i%2 ==0){
						container.className += " ani1 animated bounceInUp";
					}if (i%3 ==0 || i%4 ==0){
						container.className +=" ani2 animated bounceInUp";
					}if (i%5 ==0 || i%6 ==0){
						container.className +=" ani3 animated bounceInUp";
					}if (i%7 ==0 || i%8 ==0){
						container.className += " ani4 animated bounceInUp";
					}
				}
			}
			var insert = document.getElementById('commentContainer');
			if (information[9] != ""){
				var comments = information[9].split("@");
				for(var i = 0; i < comments.length; i++)
					if(comments[i] != "")
						createUsersComment(insert, comments[i]);
			}
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
	$(".stars").height($("#send").height()).width($("#send").width()/4);
});

function createUsersComment(insertInto, text){
	var img = document.createElement('img');
	img.src = "img/rightLogo.png";
	var content = document.createElement('div');
	content.className = "bubble-content";
	var point = document.createElement('div');
	point.className = "point";
	var data = document.createElement('p');
	var node = document.createTextNode(text);
	data.appendChild(node);
	content.appendChild(point);
	content.appendChild(data);
	insertInto.appendChild(img);
	insertInto.appendChild(content);
	var newLine = document.createElement('button');
	newLine.className = "btn btn-block invisibleRow";
	newLine.disabled = true;
	insertInto.appendChild(newLine);
	
}

function setPushMsg(){
	    //check if the user already signed - else he need to sign in
    //change the owner to the uniqe id
    var idOfSP = getUrlVars()["id"];
    $.ajax({
		url: "http://45.56.108.79:8080/APPserver/clientServlet",
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

function shareIt() {
	alert("share...");
}

function sendRank(){
	var idOfSP = getUrlVars()["id"];
	if (currentRating != null){
		$.ajax({
			url: "http://45.56.108.79:8080/APPserver/clientServlet",
			data: {requestType :"updateSalePointRank", idOfSalePoint: idOfSP, newRank: currentRating},
			success: function(newAvg) {
				$("#rankInput").prop('value', newAvg);
				alert("תודה שדירגת!");
				$("#send").attr("disabled", true);
			},
			error: function(lo){ console.log("error" + lo.message);}
		});
	}
}

function addComment(){

	var idOfSP = getUrlVars()["id"];
	var text = prompt("אנא הכנס תגובה - עד 8 מילים");
	if(text != "" & text != null){
		var size = text.split(" ");
		if (size.length <= 8){
			$.ajax({
				url: "http://45.56.108.79:8080/APPserver/clientServlet",
				data: {requestType :"addSalePointComment", idOfSalePoint: idOfSP, comment: text},
				success: function() {
					var insert = document.getElementById('commentContainer');
					createUsersComment(insert, text);			
				},
				error: function(lo){ console.log("error" + lo.message);}
				});
		}
		else
			alert("אורך תגובה אינו חוקי.");
	}
	setTimeout(function () {
		$(".background").empty().append('<img src="img/back.jpg" width="100%" style="height: -webkit-fill-available;"/>');
	}, 200);

}

$(document).on("deviceready", init);

function getRank(item) {
	$(item).prevAll().andSelf().css("filter", "none");
	$(item).nextUntil().css("filter", "grayscale()");
	currentRating = item.id.substring(0, 1);
	$("#send").prop('disabled', false);
}