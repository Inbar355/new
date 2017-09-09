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
                if(array[0] != 0)//user already log Into the system
                    window.location.href = "mainPage.html";
            },
            error: function(lo){   console.log("error" + lo.message);}
        });
    }
    else{
        document.getElementById("userName").innerHTML = " שלום אורח";
    }
});

function Login() {
    var userName = document.getElementById('loginUserName').value;
    var userPassword = document.getElementById('loginPassword').value;
    document.getElementById('dataMissMatch').innerText = "";

    if (userName !="" && userPassword !=""){
        ajaxForLogin(userName, userPassword);
    }
   else{
        alert("חסרים פרטים לכניסה");
        document.getElementById('dataMissMatch').innerText = ".נא למלא את כל הפרטים *"
    }
}

function loginToFB() {
    try {
        facebookConnectPlugin.login(["public_profile"], function (response) {
            facebookConnectPlugin.api('/me?fields=age_range,name,picture{url},id',["public_profile"], function (data) {
                /*cahngeProfilePic(data.picture.data.url);*///to the next relise - change profile pic to FB profile pic
                ajaxForLogin(data.id, null, data.name, data.age_range.min);
            });
        }, function (er) {
            console.log("error : " + er);
        })
    }
    catch (Err){
        console.log("loginToFB error cought " + Err.message);
    }
}

function ajaxForLogin(userName, userPassword, FBname, FBBDay){
    var check = document.getElementById('check').checked;
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"userLogin", userName: userName, userPass: userPassword},
        success: function(array) {
            if(array[0] == -1) {//user name + password doesn't found
                if (FBname == null){
					document.getElementById('dataMissMatch').innerText = ".שם משתמש זה אינו קיים, אנא הרשם *";
					deleteLogin();
				}
                else
                    ajaxForSignUp(FBname, userPassword, userName, FBBDay, "");
            }
            else{
                if(array[1] == 1) {//the user exists
                    if(check) 
						FBname == null ? sessionStorage.setItem('userLogin', userName) : sessionStorage.setItem('userLogin', FBname + "@" + userName);
                    alert("התחברת בהצלחה !");
                    setTimeout(function () {
                        window.location.href = "mainPage.html"; //
                    }, 1000);
                }
                else
                    document.getElementById('dataMissMatch').innerText = ".ישנה אי התאמה בין שם המשתמש לסיסמה *"
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
    else if (userName.index("@") > 0)
        document.getElementById('dataMissing').innerText = "אסור להשתמש בתווים שאינם אותיות, נא לבחור שם אחר";
    else
        ajaxForSignUp(userName, userPassword1,fullName,date,address);
}

function ajaxForSignUp(userName, userPassword1,fullName ,date, address) {
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"userSign", userName: userName, userPass: userPassword1,
            name: fullName, date: date, add: address},
        success: function(array) {
            if(array[0] == 0) {//user name already exists
                document.getElementById('dataMissing').innerText = ".שם משתמש זה תפוס, אנא בחר חדש *";
            }
            else if (array[0] == 9){
                document.getElementById('dataMissing').innerText = ".הוכנסו פרטים שגויים *";
            }
            else{
                sessionStorage.setItem('userLogin', userName);
				window.location.href = "mainPage.html";
            }
        },
        error: function(lo){ console.log("error" + lo.message); }
    });
}

function deleteSignIn(){
	document.getElementById("loginImg").style.minHeight = "500px";
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