var once = 1;
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1901343470147655',
        xfbml      : true,
        version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "js/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function(){
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

    if(sessionStorage.getItem('userLogin')) {
        document.getElementById("userName").innerHTML = " שלום " + sessionStorage.getItem('userLogin');
        $.ajax({
            url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
            data: {requestType :"isUserLogIn", userName: sessionStorage.getItem('userLogin')},
            success: function(array) {
                if(array[0] != 0)//user already log In to the system
                    window.location.href = "personalPage.html" + "?id=" + array[0];
            },
            error: function(lo){   console.log("error" + lo.message);}
        });
    }
    else{
        document.getElementById("userName").innerHTML = " שלום אורח";
    }
});


function Login() {
    document.getElementById('dataMissMatch').innerText = "";
    var userName = document.getElementById('loginUserName').value;
    var userPassword = document.getElementById('loginPassword').value;
	var check = document.getElementById('check').checked;
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"userLogin", userName: userName, userPass: userPassword},
        success: function(array) {
            if(array[0] == -1)//user name + password doesn't found
                document.getElementById('dataMissMatch').innerText = ".שם משתמש זה אינו קיים, אנא הרשם *";
            else{
                if(array[1] == 1) {//the user exists
					if(check)
						sessionStorage.setItem('userLogin', userName);
					window.location.href = "personalPage.html" + "?id=" + array[0];
                }
                else{
                    document.getElementById('dataMissMatch').innerText = ".ישנה אי התאמה בין שם המשתמש לסיסמה *"
                }
            }
        },
        error: function(lo){ console.log("error" + lo.message); }
    });
}


function signUp() {
    document.getElementById('dataMissing').innerText = "";
    var userName = document.getElementById('signUserName').value;
    var userPassword1 = document.getElementById('signPassword').value;
    var userPassword2 = document.getElementById('signPassword2').value;
    var fullName = document.getElementById('signFullName').value;
    var date = document.getElementById('signBDay').value;
    var address = document.getElementById('signAddress').value;

    if(userName == "" || userPassword1 == "" || userPassword2 == "")
        document.getElementById('dataMissing').innerText = ".שדות החובה לא מולאו כנדרש *";
    else if(userPassword1 != userPassword2)
        document.getElementById('dataMissing').innerText = ".סיסמאות אינן זהות *";
    else if(userPassword1.length > 8)
        document.getElementById('dataMissing').innerText = ".נדרשת סיסמה עד 8 תווים *";
        else if (fullName == "admin")
        document.getElementById('dataMissing').innerText = "אסור להשתמש בשם שנבחר, נא לבחור שם אחר";
    else{
        $.ajax({
            url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
            data: {requestType :"userSign", userName: userName, userPass: userPassword1,
            name: fullName, date: date, add: address},
            success: function(array) {
                if(array[0] == 0)//user name already exists
                    document.getElementById('dataMissing').innerText = ".שם משתמש זה תפוס, אנא בחר חדש *";
                else{
                    sessionStorage.setItem('userLogin', userName);
                    window.location.href = "personalPage.html" + "?id=" + array[0];
                }
            },
            error: function(lo){ console.log("error" + lo.message); }
        });
    }
}


function statusChangeCallback(response) {
    if (response.status == "connected"){
        FB.api('/me', function(response) {
            if(once){
                console.log('Successful login for: ' + response.name);
                console.log('Successful login for: ' + response.id);
                $.ajax({
                    url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
                    data: {requestType :"userSignViaFacebook", userName: response.name, userFaceID: response.id},
                    success: function(array) {
                        sessionStorage.setItem('userLogin', response.name);
                        window.location.href = "personalPage.html" + "?id=" + array[0];
                    },
                    error: function(lo){ console.log("error" + lo.message); }
                });
                once = 0;
            }
            else
                once = 1;
        });
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function deleteSignIn(){
	document.getElementById("loginImg").style.minHeight = "450px";
    document.getElementById('dataMissing').innerText = "";
    document.getElementById('signUserName').value = "";
    document.getElementById('signPassword').value = "";
    document.getElementById('signPassword2').value = "";
    document.getElementById('signFullName').value = "";
    document.getElementById('signBDay').value = "";
    document.getElementById('signAddress').value = "";

}

function deleteLogin(){
	document.getElementById("loginImg").style.minHeight = "900px";
    document.getElementById('dataMissMatch').innerText = "";
    document.getElementById('loginUserName').value = "";
    document.getElementById('loginPassword').value = "";
}