# Pandora.js [![Build Status](https://secure.travis-ci.org/FireController1847/Pandora.js.svg)](http://travis-ci.org/FireController1847/Pandora.js) [![Dependency Status](https://david-dm.org/FireController1847/Pandora.js.svg)](https://david-dm.org/FireController1847/Pandora.js) [![codecov](https://codecov.io/gh/FireController1847/Pandora.js/branch/master/graph/badge.svg)](https://codecov.io/gh/FireController1847/Pandora.js) [![Discord](https://img.shields.io/discord/173146091640848384.svg)](https://discord.gg/0xxkiR1rO4zRsYLp)

Pandora.js is an interface with the Pandora Radio API. You can find the documentation for this API [here](https://firecontroller1847.github.io/Pandora.js-Docs/).

## Usage
### Login
You can use two main methods for logging in. You can wait for the ready event, or you can use the returned promise from the login function.
```js
const { Client } = require("pandora.js");
const client = new Client();
(async () => {
  await client.login("username", "password");
  console.log("Ready!");
})();
```
```js
const { Client } = require("pandora.js");
const client = new Client();
client.on("ready", () => {
  console.log("Ready!");
});
client.login("username", "password");
```

### Stations
After logging in, you can fetch a station.
```js
const stations = await client.user.getStations();
console.log(stations.first().name);
```

### Getting Some Songs
After you've got a station, you can then get some songs.
Pandora gives you 5 songs on request when using this function.
```js
const songs = await station.getSongList(true);
songs.forEach(song => {
  console.log("Song Name: " + song.title);
});
```

## ⚠ Usage Conditions
This API is fan-made, and since the Pandora API is technically private we have to literally discover the different methods that you can use. This means that there is not a full understanding of how the API works, how it will change, or if it will even continue to work. Pandora does NOT ensorse the usage of this API at any point and IS against their Terms of Service. Please keep this in mind before you continue using this module. **You use this module at your own risk**, meaning if Pandora comes after you for breaking their Terms of Service, you cannot blame this API. To reduce any risk, **always play ads on a non-premium user account.**