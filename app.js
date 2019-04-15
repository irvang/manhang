/* 
App deployed in heroku here: https://manhang-irv.herokuapp.com/
*/

//====NPM MODULES
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//====CUSTOM MODULES
const dictionariesRouter = require('./routes/oxford-api');
const wordsRouter = require('./routes/words');

//====PORT
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(bodyParser.json())
app.use('/', express.static('views'));

//====ROUTER
app.use('/api/dictionaries', dictionariesRouter)
app.use('/words', wordsRouter)

//LANDING PAGE
app.get('/', function (req, res, next) {
  res.render();
});

//====SERVER CONNECTION
app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});


//====UNUSED
/* Returns longest and shortest word lengths in array.
Needs input as array, not as JSON.
Used only for testing purposes.   */
function getShortestAndLongest(wordArray) {

  let min = wordArray[0].length, max = wordArray[0].length;

  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].length < min) min = wordArray[i].length;
    if (wordArray[i].length > max) max = wordArray[i].length;
  }

  return { "shortestLengthInArray": min, "longestLengthInArray": max };
}