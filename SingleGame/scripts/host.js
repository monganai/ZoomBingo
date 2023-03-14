function nextRand() {
    theUrl='http://mongan.duckdns.org/nextrand'
    //theUrl = 'http://localhost:3000/nextrand'
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
    theUrl='http://mongan.duckdns.org/newgame'
    //theUrl = 'http://localhost:3000/newgame'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    document.getElementById('List').innerHTML = "Waiting for game to start!"
    document.getElementById('Last').innerHTML = ""
}