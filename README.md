# Liribot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data.

Link to deployed version:  https://juliedavison.github.io/Liribot/

Here is a link to the Demo: :smile:  https://drive.google.com/file/d/16z55rcSsyScTzATI5a512OJPChDIkirI/view

## NPM Dependencies:
* dotenv
* axios
* spotify-node-api
* fs

## API Integration:
* Spotify
* OMDB

## The following commands will run without user input:
* node liri.js spotify-this
* node liri.js movie-this
* node liri.js do-this

## The following commands will run with user input (Choose a song or a movie title):
* node liri.js spotify-this 'Little Red Corvette'
* node liri.js movie-this 'Taken2'
