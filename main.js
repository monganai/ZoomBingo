const redis = require('redis');
const express = require('express')
const promisify = require('util.promisify');


// create redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Main player page
app.get("/bingo/play", (req, res) => {
  let gameCode = req.query.gamecode;
  console.log('Got code:', gameCode);
  res.sendFile(__dirname + "/frontend/player.html");
});

// Start screen
app.get("/bingo/", (req, res) => {
  res.sendFile(__dirname + "/frontend/start_screen.html");
});

// Host screen
app.get("/bingo/host", (req, res) => {
  res.sendFile(__dirname + "/frontend/host.html");
});


// Resets the current game

app.get("/bingo/reset", async (req, res) => {
  await setAsync( req.query.gamecode, "[]" );
  console.log("Restarting game : " + req.query.gamecode);
  res.sendStatus(200)

});


app.get("/bingo/nextrand", async (req, res) => {
  // needs to check the list relating to a given gamecode
  // curl localhost:5000/bingo/nextrand?gamecode=123456
  let gameCode = req.query.gamecode;
      try {
        const getRes = await getAsync(gameCode);
        if (getRes) {
          var resultArr = getRes.split(',').map(Number);
          validNumber = false
          while (!validNumber) {
            next = Math.floor(Math.random() * 78) + 1;
          if (!resultArr.includes(next)){
            resultArr.push(next)
            validNumber = true
            await setAsync( gameCode, resultArr.toString() );
            console.log(resultArr)
            res.send(JSON.stringify(resultArr))
          } 
            if (resultArr.length>=78){
              validNumber = true
              res.send("Game with game code : " + gameCode + " is over") 
            }
        }
        } // no redis result, possibly waiting for the game to start or invalid gamecode
        else {
            res.sendStatus(307)
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error });
      }
  });


app.get("/bingo/callednumbers", async (req, res) => {
  //curl localhost:5000/bingo/callednumbers?gamecode=12345
  let gameCode = req.query.gamecode;
  try {
    const getRes = await getAsync(gameCode);
    if (getRes) {
      console.log("gamecode found");
      var JsonList = JSON.stringify(getRes);
      res.send(JsonList)
    }
    res.sendStatus(307)
    console.log("no results for gamecode");

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }

});


app.get("/bingo/gamecode", async (req, res) => {
  validNumber = false
  while (!validNumber) {
    newCode = Math.floor(Math.random() * 90000) + 10000;
try {
    const getRes = await getAsync(newCode);
    if (getRes) {
      console.log("gamecode already in use");
    }
    await setAsync( newCode, "[]" );
    console.log("new Gamecode created" + newCode);
    validNumber = true
    res.send(""+newCode)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }

  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.use(express.static(__dirname));








