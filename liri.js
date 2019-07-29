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
    console.log(`\n--- \nSearching ...:`);

    if (!userQuery) {
        userQuery = "Space Oddity";
    }
    spotify.search({
            type: 'track',
            query: userQuery,
            limit: 1
        })
        .then(function (response) {
            console.log("\n----------------------\n");
            // console.log(response.tracks.items[0]);
            console.log("Artist Name: " + response.tracks.items[0].artists[0].name);  
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Preview Link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("\n----------------------\n");
        })
        .catch(function (err) {
            console.log(err);
        });
    
    
}


// OMBD

function movieThis(movieName){
    console.log(`\n--- \nSearching ...:`);

    if (!movieName) {
        movieName = "Taken";
    }

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.OMDB;
console.log(queryUrl);

axios.get(queryUrl).then(function(response) { 
    console.log("\n----------------------\n"); 
    // console.log("Response: ", response.data);
    console.log("Movie Title: " + response.data.Title);
    console.log("Date Released: ", response.data.Released);
    console.log("Movie Rating: ", response.data.Rated);    
    console.log("IMDB Rating: ", response.data.imdbRating); 
    console.log("Rotten Tomatoes Rating: ", response.data.Ratings[1].Value); 
    console.log("Country Where Produced: ", response.data.Country);
    console.log("Language: ", response.data.Language);
    console.log("Plot: ", response.data.Plot);
    console.log("Actors: ", response.data.Actors);
    console.log("\n----------------------\n");
  })
  .catch(function(error) {
    console.error(error);
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







