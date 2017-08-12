function openNav() {
    document.getElementById("mySidenav").style.width = "70%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    $("#floating-panel").css('display', 'none');
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