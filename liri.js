require("dotenv").config();

// Import the API keys
var keys = require("./keys");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");



// Grab user command and input
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");



// App Logic
function userCommand(userInput, userQuery) {
    // makes the decision depending on user's command
    switch (userInput) {
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("I don't understand");
            break;
    }
}

userCommand(userInput, userQuery);



// Methods
function spotifyThisSong() {
    console.log("\n--- \nSearching for...:" + "${userQuery}");

    if (userQuery === undefined) {
        userQuery = "1999";
    }

    spotify
        .search({
            type: 'track',
            query: userQuery,
            limit: 1
        })
        .then(function (response) {
            console.log(response);
            // console.log(response); artist 
            // console.log(response); song name 
            // console.log(response); preview of song 
            // console.log(response); album that song is from
        })
        .catch(function (err) {
            console.log(err);
        });
    
    
}
