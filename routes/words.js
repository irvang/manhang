const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');

/* @route: GET /words
   @desc Get all words from Reach.io API. Uses fetch to get around the Cross-
   Origin Resource Sharing (CORS) policy issue when requesting access directly 
   from the front end. */

router.get('/:difficulty/:minLength/:maxLength', (req, res) => {
  /* To use the different queries in api: 
  http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  const { difficulty, minLength, maxLength } = req.params;

  const parameters = `difficulty=${difficulty}&minLength=${minLength}&maxLength=${maxLength}`;

  fetch(`http://app.linkedin-reach.io/words?${parameters}`)
    .then(res => {
      return res.text();
    })
    .then(body => {
      // (typeof body) === string, 
      //split by "\n" converts into an array; then stringify with JSON
      let ALL_WORDS = JSON.stringify(body.split('\n'));

      res.send(ALL_WORDS);
    })
    .catch(err => console.error('\n ERROR in catch:\n', err));
});


router.get('/phrases', (req, res) => {

  let data = '';

  // to use path, __dirname as a starting directory is needed, absolut path would 
  // require route as if it started on app.js, since it is where route is called
  // https://stackabuse.com/read-files-with-node-js/
  const readStream = fs.createReadStream(__dirname + '/../assets/phrases.txt', 'utf8');

  readStream.on('data', function (chunk) {
    data += chunk;
  })
    .on('end', function () {

      data = data.split('\n');

      let newArr = [];
      for (let i = 0; i < data.length; i++) {
        //add data[i] and at i+1
        // console.log(i +1, data[i])
        if (data[i] !== '') {
          // keeping structure the same to make it easier
          // body = {string: provider, array: definitions, string: word}
          newArr.push({
            word: data[i], //phrase
            definitions: data[i + 1], //single definition
            provider: "https://knowyourphrase.com/"
          });
          //increase en extra one since value has been obtained already
          i++;
        }
      }
      res.status(200).send(newArr);
    });

});

module.exports = router;