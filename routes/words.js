const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* 
route: /words
method: GET
*/
router.get('/:difficulty/:minLength/:maxLength', (req, res) => {
  /* To use the different queries in api: 
  http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  const { difficulty, minLength, maxLength } = req.params;

  const parameters = `difficulty=${difficulty}&minLength=${minLength}&maxLength=${maxLength}`;

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

module.exports = router;