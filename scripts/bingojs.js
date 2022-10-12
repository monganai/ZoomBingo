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


function getCalledNums() {
    theUrl='http://mongan.duckdns.org/callednumbers'
    //theUrl = 'http://localhost:3000/callednumbers'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


var intervalId = window.setInterval(function () {
    response = getCalledNums()
    if (response != "Temporary Redirect") {
        calledNums = response.split(',');


        document.getElementById('results').innerHTML = response;

    } else {
        document.getElementById('results').innerHTML = "Waiting for game to start"
    }
}, 5000);



function validate() {

    myNums = [];
    calledNums = [];

    var table = document.getElementById("bingotable");
    if (table != null) {
        for (var i = 1; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++)
                if (i == 3 && j == 2) {
                    //this is the centre bingo square!
                } else {
                    myNums.push(table.rows[i].cells[j].innerHTML)
                }
        }
        response = getCalledNums();
        if (response != "Temporary Redirect") {
            response = response.slice(1, -1);
            calledNums = response.split(',');
            var isEqual = (JSON.stringify(calledNums.sort()) === JSON.stringify(myNums.sort()));
            if (isEqual) {
                window.alert("Winner! Your the Bingo master!");
            }
            else {
                window.alert("Not a winning card .... yet ಠ_ಠ ")
            }

        }

    }
}



