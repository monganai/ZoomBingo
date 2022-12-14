const TRACER = require('dd-trace').init({
  service: 'bingo',
  version: '1.0',
  logInjection: true,
  debug: false,
  profiling: true,
  env: 'dev'
});

const logger = require('./logger');
const LOGGER = logger.LOGGER
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var calledNumbers = []; //array placeholder of numbers which have already been called


app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});
app.use(express.static(__dirname));


// Frontend routes


// Main player page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/player.html");
});

// Start screen
app.get("/start", (req, res) => {
  res.sendFile(__dirname + "/frontend/start_screen.html");
});

// Host screen
app.get("/host", (req, res) => {
  res.sendFile(__dirname + "/frontend/host.html");
});

// Game Routes

// /called numbers retuns the list of numbers which have been called

app.get("/callednumbers", (req, res) => {
  if (calledNumbers.length > 0) {
    var JsonList = JSON.stringify(calledNumbers);
    LOGGER.info('Current numbers are: ' + calledNumbers)
    res.send(JsonList)
  }
  else {
    LOGGER.info('Waiting for the host to start the game')
    res.sendStatus(307)
  }
});

// /Call allows a number to be called externally
app.post('/call', (req, res) => {
  const click = { clickTime: new Date() };
  console.log(click);
  console.log('Got Number:', req.body);
  console.log('Got val:', req.body['number']);
  calledNumbers.push(req.body['number']);
  console.log('array length:', calledNumbers.length);
  res.sendStatus(200);
});

// Returns the next random number for the game
app.get("/nextrand", (req, res) => {
  validNumber = false
  while (!validNumber) {
    next = Math.floor(Math.random() * 78);
    next = next+1
    if (!calledNumbers.includes(next)) {
      LOGGER.info('Next number is: ' + next)
      calledNumbers.push(next)
      validNumber = true
      var JsonList = JSON.stringify(calledNumbers);
      res.send(JsonList)
    }
    else {
      LOGGER.info('Number has already been called: ' + next)
      if (calledNumbers.length >= 78) {
        validNumber = true
        res.send("gameOver")
      }
    }
  }
});

// Resets the current game

app.get("/newgame", (req, res) => {
  if (calledNumbers.length > 0) {
    calledNumbers = [];
  }
  LOGGER.info('!!!! New game is starting !!!!')

  res.sendStatus(200)

});