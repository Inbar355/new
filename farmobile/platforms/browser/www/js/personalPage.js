$(function(){
    var id = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getUserName", id: id},
        success: function(information) {
            document.getElementById('personalName').innerText = " שלום: " + information[0];
        },
        error: function(lo){   
		document.getElementById('personalName').innerText = lo.message;}
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

function updateInfo(){
    var id = getUrlVars()["id"];
    var newAdd = document.getElementById("newAdd").value;
    var newPass = document.getElementById("newPass").value;
    var newPass2 = document.getElementById("newPass2").value;
    var newBDay = document.getElementById("newBday").value;
    if((newPass != "" && newPass2 == "") || (newPass == "" && newPass2 != "") || newPass != newPass2)
        document.getElementById('alertInfoLabel').innerText = "ישנה אי התאמה בין הסיסמאות.";
    else {
        $.ajax({
            url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
            data: {
                requestType: "updateInfo", id: id,
                Add: newAdd, Pass: newPass, Bday: newBDay},
            success: function (info) {
                document.getElementById('alertInfoLabel').innerText = "הפרטים עודכנו כנדרש";
            },
            error: function (lo) {
                console.log("error" + lo.message);
                document.getElementById('alertInfoLabel').innerText = "אנא נסה בשנית";
            }
        });
    }
}

function updatePlaces(){
    var id = getUrlVars()["id"];
    var arr = [];
    if(document.getElementById("south").checked)
        arr.add("south");
    if(document.getElementById("shfela").checked)
        arr.add("shfela");
    if(document.getElementById("center").checked)
        arr.add("center");
    if(document.getElementById("sharon").checked)
        arr.add("sharon");
    if(document.getElementById("haifa").checked)
        arr.add("haifa");
    if(document.getElementById("jerusalem").checked)
        arr.add("jerusalem");
    if(document.getElementById("north").checked)
        arr.add("north");

    ///???


}

function logOut(){
    sessionStorage.removeItem('userLogin');
    window.location.href = "loginAndSign.html";
    //clean also cookie not just session
}