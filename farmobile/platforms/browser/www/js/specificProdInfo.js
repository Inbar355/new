$(function(){
    var id = getUrlVars()["id"];
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getSpecificProdInfo", ProductID: id},
        success: function(information) {
            document.getElementById('prodName').innerText = information[0];
            document.getElementById('pricePerPack').innerText = information[1];
            document.getElementById('weightPerPack').innerText = information[2];
            document.getElementById('productPic').src = "img/" +  id + ".jpg";
            if (information[3] != null){
                document.getElementById('extraInfo').innerText = information[3];
            }
            else{
                document.getElementById('extraInfo').style.display = "none";
                document.getElementById('extraInfoTitle').style.display = "none";
            }
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