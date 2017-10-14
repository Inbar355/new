var user_name_from_FB = null;
function openNav() {
    document.getElementById("mySidenav").style.width = "70%";
    $("#floating-panel").css('display', 'none');
    $(".background").css("filter", "grayscale()");
    $(".grayScaled").css("filter", "grayscale()");
    $("#farmersImgs").css("filter", "grayscale()");
    $("#send").css("filter", "grayscale()");
    $("#comment").css("filter", "grayscale()");
    $("#floating-panel-index").css('display', 'none');
    $("#floating-panel-share").css('display', 'none');
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0%";
    document.getElementById("mySidenav").style.borderLeft = "none";
    document.body.style.removeProperty("background-color");
    $("#floating-panel").css('display', 'flex');
    $("#floating-panel-index").css('display', 'flex');
    $(".background").css("filter", "none");
    $(".grayScaled").css("filter", "none");
    $("#farmersImgs").css("filter", "none");
    $("#comment").css("filter", "none");
    $("#send").css("filter", "none");
    $("#floating-panel-share").css('display', 'flex');
}

function setText(){
   if(sessionStorage.getItem('userLogin')){
       if (sessionStorage.getItem('userLogin').indexOf("@") > 0){
           document.getElementById("userName").innerHTML = " שלום " + sessionStorage.getItem('userLogin').split("@")[0];
       }
       else{
           document.getElementById("userName").innerHTML = " שלום " + sessionStorage.getItem('userLogin');
       }
   }
    else
       document.getElementById("userName").innerHTML = " שלום אורח";
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function myDetails() {
    if(sessionStorage.getItem('userLogin')) {
        var userNameToLogIn = null;
        if (sessionStorage.getItem('userLogin').indexOf("@") > 0){
            userNameToLogIn = sessionStorage.getItem('userLogin').split("@")[1];
        }
        else{
            userNameToLogIn =  sessionStorage.getItem('userLogin');
        }
        $.ajax({
            url: "http://45.56.108.79:8080/APPserver/clientServlet",
            data: {requestType :"isUserLogIn", userName:userNameToLogIn},
            success: function(array) {
                //user already log In to the system
                if(array[0] != 0){
                    window.location.href = "personalPage.html?id=" + array[0] +"&fullName=" + array[1]
                        +"&userName=" +array[2] +"&birthday=" +array[4] +"&address=" +array[5]+"&zones=" +array[6];
                }
            },
            error: function(lo){   console.log("error" + lo.message);}
        });
    }
    else{
        window.location.href = "loginAndSign.html";
    }
}

//to the next relise - change profile pic to FB profile pic
function cahngeProfilePic(url, callback) {
    var fileURL = cordova.file.dataDirectory+"Download/profileFromFB.jpg";
    var fileTransfer = new FileTransfer();
    fileTransfer.download(
        url,
        fileURL,
        function(entry) {
            alert("download complete: " + entry);
            var reader = new FileReader();
            $("#welcomeImg").src = reader.readAsDataURL(cordova.file.dataDirectory+"Download/profileFromFB.jpg");
            callback();
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
        },
        false
    );
}

function checkDayInHebrew(currentDate){
	switch(currentDate.getDay()){
		case 0:
			return "ראשון";
		case 1:
			return "שני";
		case 2: 
			return "שלישי";
		case 3:
			return "רביעי";
		case 4:
			return "חמישי";
		case 5:
			return "שישי";
		case 6:
			return "שבת";
	}
}

function checkIfSalePointActive(salePointDate, salePointStartHour, salePointEndHour){
	var currentDate = new Date();
	var currentDayInHebrew = checkDayInHebrew(currentDate);
	if (salePointDate.includes(currentDayInHebrew))
	{
		var currentHour = currentDate.getHours();
		var saleStartHour = salePointStartHour.split(":");
		var saleEndHour = salePointEndHour.split(":");
		if(currentHour >= saleStartHour[0] && currentHour <=saleEndHour[0])
			return true;
	}
	return false;
}
