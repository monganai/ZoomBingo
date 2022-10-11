function nextRand() {
    theUrl='http://mongan.duckdns.org/nextrand'
    //theUrl = 'http://localhost:3000/nextrand'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    console.log(xmlHttp.response)
    document.getElementById('List').innerHTML = xmlHttp.response
}


function newGame() {
    theUrl='http://mongan.duckdns.org/newgame'
    //theUrl = 'http://localhost:3000/newgame'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    nextRand()
}