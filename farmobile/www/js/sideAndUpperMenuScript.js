var imgURL = null;

function openNav() {
    document.getElementById("mySidenav").style.width = "70%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    $("#floating-panel").css('display', 'none');

/*    //get parameters from url
    alert (imgURL != null &&  $("#welcomeImg").attr('src') == "img/face.jpg");/!*{
        cahngeProfilePic(url);
    }*!/*/
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0%";
    document.body.style.removeProperty("background-color");
    $("#floating-panel").css('display', 'flex');
}

function setText(){
   if(sessionStorage.getItem('userLogin'))
       document.getElementById("userName").innerHTML = " שלום " + sessionStorage.getItem('userLogin');
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
        $.ajax({
            url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
            timeout: 3000,
            data: {requestType :"isUserLogIn", userName: sessionStorage.getItem('userLogin')},
            success: function(array) {
                if(array[0] != 0)//user already log In to the system
                window.location.href = "personalPage.html?id=" + array[0] +"&fullName=" + array[1]
                    +"&userName=" +array[2] +"&birthday=" +array[4] +"&address=" +array[5]+"&zones=" +array[6];
            },
            error: function(lo){   console.log("error" + lo.message);}
        });
    }
    else{
        window.location.href = "loginAndSign.html";
    }
}
/*
function cahngeProfilePic(url) {
    imgURL = url;
    alert("changed");
}*/
