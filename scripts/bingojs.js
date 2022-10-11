var usedNums = new Array(76);

function newCard() {
    for (var i = 0; i < 24; i++) {  //<--always this code for loops. change in red
        setSquare(i);
    }
}

function setSquare(thisSquare) {
    var currSquare = "square" + thisSquare;
    var newNum;

    var colPlace = new Array(0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4);

    do {
        newNum = (colPlace[thisSquare] * 1) + getNewNum() + 1;
    }
    while (usedNums[newNum]);

    usedNums[newNum] = true;
    document.getElementById(currSquare).innerHTML = newNum;
}

function getNewNum() {
    return Math.floor(Math.random() * 75);

}

function anotherCard() {
    for (var i = 1; i < usedNums.length; i++) {
        usedNums[i] = false;
    }

    newCard();
}

function tableClick() {

    var table = document.getElementById("bingotable");
    if (table != null) {
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++)
                table.rows[i].cells[j].onclick = function () {
                    if (this.style.backgroundColor == "green") {
                        this.style.backgroundColor = "white";
                    } else {
                        this.style.backgroundColor = "green";
                    }

                };
        }
    }
}

var intervalId = window.setInterval(function () {
    theUrl='http://mongan.duckdns.org/callednumbers'
    //theUrl = 'http://localhost:3000/callednumbers'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    if (xmlHttp.responseText != "Temporary Redirect"){
        document.getElementById('results').innerHTML = xmlHttp.responseText;
    } else{
        document.getElementById('results').innerHTML = "Waiting for game to start"
    }
    
    return xmlHttp.responseText;
}, 5000);