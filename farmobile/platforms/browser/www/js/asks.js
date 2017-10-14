$(function(){
    chackVars();
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

function chackVars() {
    var vars = {};
    try {
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/g, function (m, key, value) {
                vars[key] = decodeURIComponent(value);
            });
            if (vars['Prov'] == "true") {
                $("input:radio:last").click();
            }
    }
    catch (exp){
        console.log(exp);
    }
}

function updateReqProvider() {
    var fname = document.getElementById("fnameProvider").value;
    var phoneNumber = document.getElementById("phoneProvider").value;
    var lname = document.getElementById("lnameProvider").value;

    if (validPhoneInput() && checkValues(null, phoneNumber, fname, lname) ){
        $.ajax({
            url: "http://45.56.108.79:8080/APPserver/clientServlet",
            data: {requestType :"joinUs", firstName: fname, lastName: lname,phone: phoneNumber },
            success: function() {
                alert ("הבקשה נשלחה בהצלחה.ניתן לשלוח בקשה אחת בלבד בכל הפעלה של האפקליציה.");
                $("#sendDataProv").remove();
                deleteRequestsProv();
            },
            error: function(lo){
                alert('אירעה שגיאה, נא נסה שוב');
                console.log(lo);
            }
        });
    }
}

function updateReq() {
    var fname = document.getElementById("fname").value;
    var phoneNumber = document.getElementById("phone").value;
    var lname = document.getElementById("lname").value;
    var address = document.getElementById("address").value;

    if (validPhoneInput() && checkValues(address, phoneNumber, fname, lname)){
        $.ajax({
            url: "http://45.56.108.79:8080/APPserver/clientServlet",
            data: {requestType :"sendNewAddress", firstName: fname, lastName: lname,phone: phoneNumber, address: address },
            success: function(r) {
                alert ("הבקשה נשלחה בהצלחה.ניתן לשלוח בקשה אחת בלבד בכל הפעלה של האפקליציה.");
                $("#sendData").remove();
                deleteRequests();
            },
            error: function(lo){
                alert('אירעה שגיאה, נא נסה שוב');
                console.log(lo);
            }
        });
    }
}

function checkValues(address, phone, name, lname) {
    if (address != null && address.length > 25){
        alert("לא ניתן להכניס יותר מ25 תווים לבקשה");
        return false;
    }
    else if (name.length > 20 || lname.length < 2) {
        alert("השם חייב להיות לכל היותר באורך 20 תווים");
        return false;
    }
    else if (phone.length != 10) {
        alert("נא להכניס מספר בן 10 ספרות בדיוק");
        return false;
    }
    else if ( address != null && address.length  < 2){
        alert("נא הכנס יעד מבוקש");
        return false;
    }
    else if (name.length < 2 || lname.length < 2) {
        alert("נא הכנס שם תקין ליצירת קשר");
        return false;
    }
    else if (phone.length < 10) {
        alert("נא הכנס מספר טלפון תקין ליצירת קשר");
        return false;
    }
    return true;
}

function deleteRequests(){
    document.getElementById("RequestImg").style.minHeight = "550px";
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";

}

function validPhoneInput(){
	var phoneNumber = document.getElementById('phoneProvider').value();
	if(isNaN(phoneNumber))
		alert('מספר טלפון שגוי');
}

function deleteRequestsProv(){
    document.getElementById("RequestImg").style.minHeight = "460px";
    document.getElementById('fnameProvider').value = "";
    document.getElementById('lnameProvider').value = "";
    document.getElementById('phoneProvider').value = "";
}