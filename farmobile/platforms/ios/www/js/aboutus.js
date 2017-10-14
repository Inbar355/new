$(function(){
    /*$.ajax({
        url: "http://45.56.108.79:8080/APPserver/clientServlet",
        data: {requestType :"getAboutUs"},
        success: function(information) {

                    container.className += " ani1 animated bounceInUp";

        },
        error: function(lo){   console.log("error" + lo.message);}
    });*/
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

