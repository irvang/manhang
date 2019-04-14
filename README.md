# MANHANG


## Overview


Manhang is an implementation of the popular game (you guessed it) [Hangman](/Users/irvingangulo/dev/manhang-2/README.md). The game consists of guessing a word that another player, the computer in this case, has selected. For this implementation, the user will have 6 chances to guess the word. 

<!-- After the user finishes, the word meaning is automatically searched in two (2) dictionaries, Oxford University Press and Webster-Merrian Online. -->


### Deployed Site

[Manhang on Heroku](https://manhang-irv.herokuapp.com/)


## Features
I have included several features in this project as a way to make the game a bit more appealing. Some of these features are: 

- Display word defintions at end of game.

- Drawing of the figure to higlight remaining trials.

- Implementation of difficulty, min and max word lengths, through the provided Reach API.

## Featured APIs and technologies
- Canvas API: Display drawing.

- Dictionaries: I am using Oxford and Merriam-Webster APIs to search for the meaning of the words once the game is finished, if the word is not found, a messag esaying "No definition found" is displayed.

- Modules: JavaScript modules using import and export statements to help with code maintenance and clarity. 

- Fetch API: Requests data from web server.

- Responsive design: Using flexbox, to adjust screen to different sizes. Needs improvement for mobile devices, although it displays well.

<!-- Alphabet interface, remaining trials
express.router -->

## Setup
### Prerequisites
[Node.js](https://nodejs.org/en/) is required in order to run the application locally. To install Node, follow the istrunctions at the [downloads page](https://nodejs.org/en/download/).

### Installation
- Clone or download the folder. 

- Change to folder directory: `cd ~/manhang`

- Install dependencies: `npm i`

- Start application: `node app.js`

The application should now start on the determined server. 



## Built With

- [Node.js](https://nodejs.org/en/download/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

- [JavaScript](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js



<!-- not sure if will keep this -->
<!-- - [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js -->



<!-- ## Acknowledgments -->


 
-----------------------------------------------------------------

