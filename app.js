/* 
App deployed in heroku here: https://manhang-irv.herokuapp.com/
*/

const fetch = require('node-fetch');
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//====CUSTOM MODULES
const usersRouter = require('./routes/users');
const dictionariesRouter = require('./routes/oxford-api');
const wordsRouter = require('./routes/words');
const dbConfig = require('./dbConfig/config-index');

//====PORT
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use('/', express.static('views'));

//====ROUTER
app.use('/api/users', usersRouter);
app.use('/api/dictionaries', dictionariesRouter)
app.use('/words', wordsRouter)


app.get('/', function (req, res, next) {
  res.render();
});

//====MONGOOSE CONNECTION
mongoose.connect(dbConfig.getDbConnectionString(), { useNewUrlParser: true });//returns string

//====SERVER CONNECTION
app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});


//====UNUSED 
app.get('/words', function (req, res, next) {

  /* To use the different queries in api: http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  fetch('http://app.linkedin-reach.io/words')
    // fetch('/words.txt')
    .then(res => res.text())
    .then(body => {
      // res.render("index", { word_data: body })
      res.send(body)
    });

});

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