$(function(){
    $.ajax({
        url: "http://Vmedu122.mtacloud.co.il:8080/APPserver/clientServlet",
        data: {requestType :"getProductInfo"},
        success: function(information) {
            for(var i=0; i<information.length; i++) {
                var id = information[i].split("-");
                var container = document.createElement('div');
                container.className = "contain col-xs-5";
                var img = document.createElement('img');
                img.id = id[1];
                var str = "img/" +  img.id + ".jpg";
                img.src = str;
                img.onclick = function() { window.location.href = "specificProduceInfo.html"+ "?id=" + this.id; };
                var text = document.createElement('span');
                text.innerText = id[0];
                text.className = "label label-info";
                text.id = "text";
                container.appendChild(img);
                container.appendChild(text);
                document.body.appendChild(container);
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

function searchProduce(){
    var found = 0;
    var text = document.getElementById('search').value;
    var x = document.getElementsByClassName("contain col-xs-5");
    var toRemove = []
    for (var i=0; i< x.length; i++){
        if(x[i].childNodes[1].textContent != text)
            toRemove.push(x[i]);
        else
            found = 1;
    }
    var size = toRemove.length;
    for(i=0; i<size; i++)
        document.body.removeChild(toRemove.pop());
    if (found == 0)
        document.getElementById('dataMissing').innerText = "לא נמצאו תוצאות.";
}