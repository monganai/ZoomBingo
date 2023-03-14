
var usedNums = new Array(76);
var gameCode;

var urlSwitch = 'http://localhost:3000'
//var urlSwitch = 'http://mongan.duckdns.org'

function initGame(){
   currUrl =  document.URL
   code = currUrl.split('=')
   gameCode=code[code.length -1]
}

function newCard() {
    initGame()
    for (var i = 0; i < 24; i++) {
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
    theUrl = urlSwitch+'/bingo/callednumbers?gamecode='+gameCode
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;

}

function clearCardColour(){
var table = document.getElementById("bingotable");
if (table != null) {
    for (var i = 1; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
            if (i == 3 && j == 2) {
                //this is the centre bingo square!
            } else {
                document.getElementById(table.rows[i].cells[j].id).style.backgroundColor = "white";   
            }
    }
}
}

var intervalId = window.setInterval(function () {
    response = getCalledNums()
    console.log(response)
    if (response != '"-1"') {
        console.log(response)
        calledNums = response.split(',');
        number = calledNums[calledNums.length - 1]
        number = number.replace('[', '');
        number = number.replace(']', '');
        number = "Next Number is > " + number + " <"
        document.getElementById('results').innerHTML = number;
    } else {
        document.getElementById('results').innerHTML = "Waiting for the game to start!"
        clearCardColour()
    }
}, 5000);

function validate() {


    myNums = [];
    calledNums = [];
    response = getCalledNums();
    if (response != "Temporary Redirect"|| response == "-1") {
        response = response.slice(1, -1);
        calledNums = response.split(',');

        var table = document.getElementById("bingotable");
        if (table != null) {
            for (var i = 1; i < table.rows.length; i++) {
                for (var j = 0; j < table.rows[i].cells.length; j++)
                    if (i == 3 && j == 2) {
                        //this is the centre bingo square!
                    } else {
                        myNums.push(table.rows[i].cells[j].innerHTML)
                        if (calledNums.includes(table.rows[i].cells[j].innerHTML)) {
                            document.getElementById(table.rows[i].cells[j].id).style.backgroundColor = "Purple";
                        }
                        else{
                            document.getElementById(table.rows[i].cells[j].id).style.backgroundColor = "white";
                        }
                    }
            }

            const result = myNums.every(val => calledNums.includes(val))
            if (result && myNums.length == 24) {
                document.getElementById('btitle').innerHTML = "!!!! BINGO WINNER !!!!"

            }
            else {
               // window.alert("Not a winning card .... yet ಠ_ಠ ")
            }

        }

    }
}