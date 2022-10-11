## ZoomBingo
### Online multiplayer Bingo game to play on Zoom calls!

- Each player that accesses the index page will get a unique random bingo card.
- Clicking on a number will mark its square green, clicking it again will reverse it to white.
- Each instance of this app can only have one host (so only 1 game concurrently for now)
- The bingo cards update to show the called numbers every 5 seconds
- The host can restart the game, and is the only one who calls numbers (1-75)


![alt text for screen readers](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/7Kukz4AZ/53bf244b-c550-4bf9-9298-00a59ff8bbad.jpg?v=d0fa7235d78638932f139543fb7caa15 "Player view")

![alt text for screen readers](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/5zuPjgny/51532d94-50ea-4b54-8d4d-622acea85b6d.jpg?v=8b4e32305a4e1400ce2ff12b1f7843ac "Host view")


ToDo:

- Implement logic for concurrent games
- Scoreboard? 


Local development:

- Update `theUrl` to `http://localhost:3000/` in `host.js` & `bingojs.js`
