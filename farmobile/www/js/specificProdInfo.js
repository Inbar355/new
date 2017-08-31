var once = 1;
$(function(){
    var id = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        timeout: 3000,
        data: {requestType :"getSpecificProdInfo", ProductID: id},
        success: function(information) {
			var str = "על התוצרת: " + information[0];
            document.getElementById('prodName').innerText = str;
			information[1] != null ? document.getElementById('pricePerPack').innerText = information[1] : document.getElementById('pricePerPack').innerText = "כרגע אין מחיר עבור תוצר זה.";
			information[2] != null ? document.getElementById('weightPerPack').innerText = information[2] : document.getElementById('weightPerPack').innerText = "כרגע אין משקל עבור תוצר זה.";
            document.getElementById('productPic').src = "img/" +  id + ".jpg";
			document.getElementById('extraInfo').innerText = information[3];
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

	setInnerHtmlText('pricePerPack');
    setText();
});

function setInnerHtmlText(id){
	if (id == "weightPerPack" && once == 1){
		document.getElementById('first').className -= "active";
		once = 0;
	}
	 var x = document.getElementsByClassName("swap");
	 for (var i=0; i< x.length; i++)
		 x[i].style.display = 'none';
        
	document.getElementById(id).style.display = 'block';
}