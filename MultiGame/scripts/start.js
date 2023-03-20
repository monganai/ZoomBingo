//var urlSwitch = 'http://localhost:3000'
var urlSwitch = 'http://mongan.duckdns.org'


function onSubmit(){
    gameCode = document.getElementById('gamecode').value
    username = document.getElementById('username').value
    if (isValidGameCode(gameCode)){
        theUrl= urlSwitch+'/bingo/play?gamecode='+ gameCode
        window.location.replace(theUrl);
    } else{
        // implement some retry prompt for the user
    }
}
function isValidGameCode(code){

return true;
}

