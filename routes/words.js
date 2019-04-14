const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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
  fetch(`/phrases.txt`)
    .then(function (response) {
      if (response.ok) {

        return response.text();//a promise, convert to object
      }
    })
    .then(bodyAsJson => {

      //may have to restructure so that gui loads before all the response
      //====Starts game after receiving array
      // state.ALL_WORDS = [...bodyAsJson];//clone array, not a reference

      // startGameAddListeners();// uses state.ALL_WORDS

      bodyAsJson = bodyAsJson.split('\n')

      let newArr = [];
      for (let i = 0; i < bodyAsJson.length; i++) {
        //add bodyAsJson[i] and at i+1
        // console.log(i +1, bodyAsJson[i])
        if (bodyAsJson[i] !== '') {
          newArr.push({
            phrase: bodyAsJson[i],
            meaning: bodyAsJson[i + 1],
            source: "https://knowyourphrase.com/"
          });
          //increase en extra one since value has been obtained already
          i++;
        }

      }

      bodyAsJson.forEach((elm, i) => {
        if (elm !== '') {
          // console.log('empty at:', elm)
        }
      })
      console.log(newArr)
    })
    .catch(error => console.log('ERROR: \n', error));
})

module.exports = router;