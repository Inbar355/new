var once = 1;
var sec = 1;
$(function(){
    var id = getUrlVars()["id"];
    $.ajax({
        url: "http://45.56.108.79:8080/APPserver/clientServlet",
        data: {requestType :"getPersonalInfo", farmersID: id},
        success: function(information) {
            console.log(information);
			var str = information[0];
            document.getElementById('farmersName').innerText = str;
            document.getElementById('farmName').innerText = information[1];
            document.getElementById('farmAdd').innerText = information[2];
            document.getElementById('farmerInfo').innerText = information[3];
            document.getElementById('farmInfo').innerText = information[4];
            var img = document.getElementById('myImage');
            img.src = "img/farmer" + id + ".jpg";
            img.onerror = "img/farmer.png";
        },
        error: function(lo){   console.log("error" + lo.message);}
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


function getDefImage() {
    var img = document.getElementById('myImage');
    img.src = "img/DefFarmer.jpg";
}