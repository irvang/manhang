# MANHANG


## Overview


Manhang is an implementation of the popular game (you guessed it) [Hangman](https://en.wikipedia.org/wiki/Hangman_(game)). The game consists of guessing a word that another player, the computer in this case, has selected. For this implementation, the user will have 6 chances to guess the word. The user will have the ability to select a new word and to select whether to play with phrases instead of words. Correct or missed selections will be displayed with the green or red color respectively.


### Deployed Site

[Manhang on Heroku](https://manhang-irv.herokuapp.com/)

## Setup
### Prerequisites
[Node.js](https://nodejs.org/en/) is required in order to run the application locally. To install Node, follow the istrunctions at the [downloads page](https://nodejs.org/en/download/).

### Installation
- Clone or download the folder

- Change to folder directory: `cd ~/manhang`

- Install dependencies: `npm i`

- Start application: `node app.js`

- Server should now be listening on port 3000 (dafault). 

- Visit browser on localhost:3000 (default)




## Features
I have included several features in this project as a way to make the game a bit more appealing. Some of these features are: 

- Ability to choose from either word or phrase mode.

- Display word or phrase defintions at end of game.

- Drawing a figure to higlight remaining trials.

- Implementation of difficulty, min and max word lengths, through the provided Reach API. These are also disabled when phrase mode is selected.

## Featured APIs and technologies
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API): Display drawing.

- Dictionaries: Use of [Oxford](https://developer.oxforddictionaries.com/) and [Merriam-Webster](https://dictionaryapi.com/) APIs to search for the meaning of the words once the game is finished, if the word is not found, a messag esaying "No definition found" is displayed.

- Modules: JavaScript modules using import and export statements to help with code maintenance and clarity. 

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API): Requests data from web server.

- Responsive design: Using [flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox), to adjust screen to different sizes.


## Built With

- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - A high-level, interpreted programming language that conforms to the ECMAScript specification.
- [Node.js](https://nodejs.org/en/download/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js



## Other Resources
- [Oxford Dictionaries API](https://developer.oxforddictionaries.com/) 
- [Merriam-Webster Dictionary API](https://dictionaryapi.com/) 
- [Know Your Phrase](https://knowyourphrase.com/) 


 
-----------------------------------------------------------------

