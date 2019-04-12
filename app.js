/* 
App deployed in heroku here: https://manhang-irv.herokuapp.com/
*/

//====PORT
const fetch = require('node-fetch');
const express = require('express')
const bodyParser = require('body-parser');

const app = express()

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use('/', express.static('views'))

// https://github.com/expressjs/express/wiki#template-engines


app.get('/', function (req, res, next) {
  res.render();
});


app.get('/words/:difficulty/:minLength/:maxLength', function (req, res, next) {

  /* To use the different queries in api: 
  http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  const { difficulty, minLength, maxLength } = req.params;

  const parameters = `difficulty=${difficulty}&minLength=${minLength}&maxLength=${maxLength}`;

  // fetch('/words.txt')
  fetch(`http://app.linkedin-reach.io/words?${parameters}`)
    .then(res => res.text())
    .then(body => {

      // (typeof body) === string, 
      //split by "\n" converts into an array, then into JSON
      let ALL_WORDS = JSON.stringify(body.split('\n'));

      res.send(ALL_WORDS)
    })
    .catch(err => console.error('\n ERROR in catch:\n', err));
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

app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});


const OxfordDictionary = require('./app-js/oxford-api.js')();

// OxfordDictionary();


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
