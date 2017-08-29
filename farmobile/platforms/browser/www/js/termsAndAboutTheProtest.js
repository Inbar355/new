$(function() {
    initTermsAndInfo();
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
} );

function initTermsAndInfo() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var reqFor;
    if (page == "TermsOfUse.html"){
        reqFor = "termsOfUse";
    }
    else{
        reqFor = "aboutTheProtest";
    }
	
	ajaxForProtestInfo (reqFor, function(value) {
        console.log(value);
     if (value.includes("error")){
           $('<p>' + value + "error" + '</p>').appendTo('#textZone');
        }
        else{
         if (page == "TermsOfUse.html"){
             $(' <h3 id="topHeadline">תנאי שימוש</h3><br><br><br>').appendTo('#textZone');
         }
			$('<p>'+value[1]+'</p>').appendTo('#textZone');
         if (page == "protestInfo.html"){
             $('<p>'+'<iframe width="100%" height="100%" src="http://www.youtube.com/embed/ziHQ1wWuiQ0?wmode=opaque;rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
                 +'</p>').appendTo('#videoZone');
         }
        }
    })
}


function ajaxForProtestInfo (reqFor, callback){
	 $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getAboutTheProtest", requsetFor: reqFor},
		      error: function (error) {
            console.error("Failed to get ajax response : " + error);
        },
        success: function(value) {
            console.log(value);
            if (callback != null){
                callback(value);
            }
        }
    });
}