var once = 1;
var sec = 1;
$(function(){
    var id = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getPersonalInfo", farmersID: id},
        success: function(information) {
			var str = "שם החקלאי: " + information[0];
            document.getElementById('farmersName').innerText = str;
            document.getElementById('farmName').innerText = information[1];
            document.getElementById('farmAdd').innerText = information[2];
            document.getElementById('farmerInfo').innerText = information[3];
            document.getElementById('farmInfo').innerText = information[4];	
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
	setInnerHtmlText('farmName', 'swap');
	setInnerHtmlText('farmerInfo', 'swapInfo');
    setText();
});

function setInnerHtmlText(id, className)
{
	if (id == "farmAdd" && once == 1){
		document.getElementById('firstElem').className -= "active";
		once = 0;
	}
	else if (id == "farmInfo" && sec == 1){
		document.getElementById('secElem').className -= "active";
		sec = 0;
	}
	
	 var x = document.getElementsByClassName(className);
	 for (var i=0; i< x.length; i++)
		 x[i].style.display = 'none';
        
	document.getElementById(id).style.display = 'block';
}