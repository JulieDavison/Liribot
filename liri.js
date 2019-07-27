require("dotenv").config();
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Import the API keys
var keys = require("./keys");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);


// Import the FS package for read/write.
var fs = require("fs");



// Grab user command and input
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");
console.log(userQuery);


// App Logic
function userCommand(userInput, userQuery) {
    // makes the decision depending on user's command
    switch (userInput) {
        case "spotify-this":
            spotifyThisSong(userQuery);
            break;
        case "movie-this":
            movieThis(userQuery);
            break;
        case "do-this":
            doThis();
            break;
        default:
            console.log("I don't understand");
            break;
    }
}

userCommand(userInput, userQuery);



// Methods
function spotifyThisSong(userQuery) {
    console.log(`\n--- \nSearching for...: ${userQuery}`);

    if (!userQuery) {
        userQuery = "1999";
    }
    spotify.search({
            type: 'track',
            query: userQuery,
            limit: 1
        })
        .then(function (response) {
            console.log(response.tracks.items[0]);
            // console.log(response); artist 
            // console.log(response); song name 
            // console.log(response); preview of song 
            // console.log(response); album that song is from
        })
        .catch(function (err) {
            console.log(err);
        });
    
    
}


// OMBD

function movieThis(movieName){

    if (!movieName) {
        movieName = "Mr. Nice Guy";
    }

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.OMDB;

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: ", response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}


function doThis() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data.split(','));
        var data = (data.split(','));
        //here we should call functoin
        userCommand(data[0], data[1]);
      });
}







