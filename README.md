# PandoraAPI
This is a node.js version of the unofficial Pandora API. Due to the fact that it is unofficial, I will __not__ be publishing it as a node module. On the other hand, I will build it like a node module and encourage that if you want to use it you can clone it into a folder and require it from there.

__What about docs?__ Here's a GitHub IO url for the autogen documentation. https://firecontroller1847.github.io/Pandora.js-Docs/

__I don't like the look of your docs!__ Okay, that's fine. Checkout the instructions below to generate docs. Feel free to modify the package.json :)

- Using Yarn
  - `yarn install`
  - `yarn run jsdoc:gen`
- Using NPM
  - `npm install`
  - `npm run jsdoc:gen`

Then, just open up index.html in the new folder called `out`.

## Example Usage
Here are some examples on how to use the module.

#### Logging In
Method #1 (Preferred)
```js
const { Client } = require('../node-pandora-api');
const client = new Client();
client.on('ready', () => {
  console.log('Client Ready!');
});
client.login('myusername', 'mypassword');
```

Method #2 (Not Recommended)
```js
const { Client } = require('../node-pandora-api');
const client = new Client();
(async () => {
  await client.login('myusername', 'mypassword');
  console.log('Client Ready!');
});
```

Method #3 (Least Recommended)
```js
const { Client } = require('../node-pandora-api');
const client = new Client();
client.login('myusername', 'mypassword').then(() => {
  console.log('Client Ready!');
});
```

#### Important Note
All further examples should happen AFTER you're logged in.

#### Getting A Station
Method #1 (Must Be Run In An Async Function (Ex. Using Method #2 For Login))
```js
const stations = await client.user.getStations();
console.log(JSON.stringify(stations, null, 2));
```

Method #2 (Not Recommended)
```js
client.user.getStations().then(stations => {
  console.log(JSON.stringify(stations, null, 2));
});
```
Simple right?

#### Getting Some Random Songs
Because, it's Pandora. This is what the app does.

```js
// Assuming you now have the stations variable from above.
const station = stations.first(); // Get the first station, unless you want to sift through them and find the one you want.
const songs = await station.getSongList(true); // This is the first time we're getting the song list, so we need to specify that using `true`.
console.log(JSON.stringify(songs, null, 2));
```

Congradulations, you've successfully gotten some songs! Now, just make a `get` request to one of the song's audioURL's, and you're on your way!

## ⚠ This Module Is Not Complete
All Pandora methods may not be completed. I've taken the time and effort to reverse engineer the Pandora API (with some help of [this doc sheet](https://6xq.net/pandora-apidoc/rest/), although not much), but since Pandora doesn't ensorse the usage of this API, they may change things at will without notice. Versions of this module will break randomly, and patches may or may not be fixed. **All pull requests to help add more methods or items to the API are appreciated.**

## ⚠ There are 'with good intent' conditions you should follow!
Pandora does not endorse the usage of this API, and it may even get your account banned. If you use this API to pirate songs or play songs without playing the additional ads for them, **you are doing so at your own risk**. This API is merely to provide a way to use Pandora in Node.js. What you do with it is on you. If Pandora Media comes after you, sues you, or anything similar because your app is breaking the terms of service (or anything similar), you CANNOT blame this API.

**You must ALWAYS play ads on a non-premium user account!**
