$(function(){
    checkVariables(addUpperMenu);
    setText();
});

function addUpperMenu() {
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
}

function setZones(zones){
    if (zones != "undefined"){
        var splited = zones.split(',');
        for (var i = 0; i < splited.length; i++) {
            document.getElementById(splited[i]).setAttribute('checked', true);
        }
    }
}

function checkVariables(callback) {
    var vars = {};
    var userNameToDisplay;
    try {
        if (sessionStorage.getItem('userLogin').indexOf("@") > 0) {
            userNameToDisplay = sessionStorage.getItem('userLogin').split("@")[0];
        }
        else {
            userNameToDisplay = sessionStorage.getItem('userLogin');
        }
        document.getElementById('personalName').innerText = " שלום " + userNameToDisplay;

        if (window.location.href.indexOf('fullName') > 0) {
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/g, function (m, key, value) {
                vars[key] = decodeURIComponent(value);
            });
            if (window.location.href.indexOf('address') > 0 && vars['address'].indexof("undefined") == 0) {
                $("#newAdd").val(vars['address']);
            }
            if (window.location.href.indexOf('birthday') > 0 && vars['birthday'].indexof("undefined") == 0) {
                $("#newBday").val(vars['birthday']);
            }
            if (vars['zones'] != "NULL" && vars['zones'].indexof("undefined") != 0) {
                setZones(vars['zones']);
            }
        }
    }
    catch (exp){
        console.log(exp);
    }
	callback();
}

function updateInfo(){
    var id = getUrlVars()["id"];
    var newAdd = document.getElementById("newAdd").value;
    var newPass = document.getElementById("newPass").value;
    var newPass2 = document.getElementById("newPass2").value;
    var newBDay = document.getElementById("newBday").value;
    var zones = getPlaces();
    if($(".passwordZone").css( "display" ) != "none "&&((newPass != "" && newPass2 == "") || (newPass == "" && newPass2 != "") || newPass != newPass2)){
        document.getElementById('alertInfoLabel').innerText = "ישנה אי התאמה בין הסיסמאות.";
    }
    else {
        $.ajax({
            url: "http://45.56.108.79:8080/APPserver/clientServlet",
            data: {
                requestType: "updateInfo", id: id,
                Add: newAdd, Pass: newPass, Bday: newBDay, Zones: zones.toString()},
            success: function (info) {
                document.getElementById('alertInfoLabel').innerText = "הפרטים עודכנו כנדרש";
                setTimeout(function () {
                    window.location.href = "mainPage.html"; //
                }, 1000);
            },
            error: function (lo) {
                console.log("error" + lo.message);
                document.getElementById('alertInfoLabel').innerText = "אנא נסה בשנית";
            }
        });
    }
}

function getPlaces(){
    var id = getUrlVars()["id"];
    var arr = [];
    if(document.getElementById("south").checked)
        arr.push("south");
    if(document.getElementById("shfela").checked)
        arr.push("shfela");
    if(document.getElementById("center").checked)
        arr.push("center");
    if(document.getElementById("sharon").checked)
        arr.push("sharon");
    if(document.getElementById("haifa").checked)
        arr.push("haifa");
    if(document.getElementById("jerusalem").checked)
        arr.push("jerusalem");
    if(document.getElementById("north").checked)
        arr.push("north");

    if(arr.length ==0){
        arr = "NULL";
    }
    return arr;
}

function logOut(){
    sessionStorage.removeItem('userLogin');
 /*   cahngeProfilePic("img/face.jpg");*/
    window.location.href = "loginAndSign.html";
    //clean also cookie not just session
}