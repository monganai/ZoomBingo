var gameCode;
var urlSwitch = 'http://localhost:3000'
//var urlSwitch = 'http://mongan.duckdns.org'


function setupGame(){
    var x = document.getElementById("hostDiv");
    x.style.display = "none";
}

function startGame(){
    var x = document.getElementById("hostDiv");
    x.style.display = "block";
    var x = document.getElementById("setupDiv");
    x.style.display = "none";    
}

function getGameCode(){
    theUrl= urlSwitch+'/bingo/gamecode'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    console.log("game code on host screen: " + xmlHttp.response)
    document.getElementById('List').innerHTML = 'Game code is: ' + xmlHttp.response
    gameCode=xmlHttp.response

}
function nextRand() {
    theUrl= urlSwitch+'/bingo/nextrand?gamecode='+ gameCode
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    console.log(xmlHttp.response)

    if (xmlHttp != "gameOver") {
        document.getElementById('List').innerHTML = "Numbers so far: " + xmlHttp.response
        calledNums = xmlHttp.response.split(',');
        number = calledNums[calledNums.length - 1]
        number = number.replace('[', '');
        number = number.replace(']', '');
        number = "Next Number is: " + number
        document.getElementById('Last').innerHTML = number
    } else{
        document.getElementById('Last').innerHTML = ''
        document.getElementById('List').innerHTML = 'Game Over!'

    }
}
function newGame() {
    theUrl = urlSwitch+'/bingo/reset?gamecode='+ gameCode
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    document.getElementById('List').innerHTML = "Waiting for game to start!"
    document.getElementById('Last').innerHTML = ""
}