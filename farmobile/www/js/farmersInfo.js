$(function(){
    var addContainer = true;
    $.ajax({
        url: "http://45.56.108.79:8080/APPserver/clientServlet",
        timeout: 3000,
        data: {requestType :"getFarmersInfo"},
        success: function(information) {
            for(var i=0; i<information.length; i++) {
                var id = information[i].split("-");
                var container = document.createElement('div');
                container.className = "contain col-xs-5";
                var img = document.createElement('img');
                img.src = "img/farmer" + id[1] + ".jpg";
                img.onerror = function () {
                    $(this).attr('src', 'img/DefFarmer.jpg');
                    img.src = "img/DefFarmer.jpg";
                };
                img.id = id[1];
                img.className = "imgClass";
                img.onclick = function() { window.location.href = "personalFarmerInfo.html"+ "?id=" + this.id; };
                var text = document.createElement('span');
                text.innerText = id[0];
                text.className = "label";
                text.id = "text";
                container.appendChild(img);
                container.appendChild(text);
                if (addContainer){
                    var newContainer = document.createElement('div');
                    newContainer.className = "container";
                    newContainer.style = "padding-right: 0;padding-left: 0;"
                    $("#farmersImgs").append(newContainer);
                    $(newContainer).append(container);
                    addContainer = false;
                }else{
                    var spacer = document.createElement('div');
                    spacer.className = "col-xs-1";
                    $(newContainer).append(spacer);
                    $(newContainer).append(container);
                    addContainer = true;
                }
                if (i%1 ==0 || i%2 ==0){
                    container.className += " ani1 animated bounceInUp";
                }if (i%3 ==0 || i%4 ==0){
                    container.className +=" ani2 animated bounceInUp";
                }if (i%5 ==0 || i%6 ==0){
                    container.className +=" ani3 animated bounceInUp";
                }if (i%7 ==0 || i%8 ==0){
                    container.className += " ani4 animated bounceInUp";
                }
            }
        },
    error: function(lo){   console.log("error " + lo.message);}
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
    $("#upperButton").css({ 'background' : ''});
    setText();
});

function searchFarmer(){
    var found = 0;
    var text = document.getElementById('search').value;
    var x = document.getElementsByClassName("contain col-xs-5");
    var toRemove = [];

    if(text.length == 0){
        recoverPics();
    }
    else
    {
        for (var i=0; i< x.length; i++){
            if(x[i].childNodes[1].textContent != text)
                toRemove.push(x[i]);
            else
                found = 1;
        }
        for (var i = 0; i < toRemove.length; i++){
            toRemove[i].style.display = 'none';
        }
        if (found == 0)
            document.getElementById('dataMissing').style.display = 'block';
    }
}

function recoverPics() {

    var x = document.getElementsByClassName("contain col-xs-5");
    for (var i = 0; i < x.length; i++){
        x[i].style.display = 'block';
    }
    document.getElementById('search').value = "";
    document.getElementById('dataMissing').style.display = 'none';
}