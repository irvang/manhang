const fetch = require('node-fetch');
const Dictionary = require("oxford-dictionary-api");
const express = require('express');
const router = express.Router();

// @route /api/dictionaries/
// @desc Searches for entry in Oxford University Dictionary. If entry is not found, 
// redirects to Merriam-Webster 
router.get('/oxford/:word', (req, res) => {

  // Oxford API
  const app_id = "1173d420";
  const app_key = "fd07bff2c06f70752c2a3ee36a3c5bab";
  const dict = new Dictionary(app_id, app_key);

  const definitions = [];

  const { word } = req.params;

  dict.find(`${word}/definitions`, function (error, data) {

    // if entry is not found in Oxford, an error is generated, 
    // if there is an error, redirect to Merriam
    if (error) {
      res.redirect(`/api/dictionaries/merrian/${word}`);
      return;
    }

    const { provider } = data.metadata;//Oxford University Press


    //definitions are found within several nested arrays, multiple loops to reach
    //the definitions
    data.results[0].lexicalEntries.forEach((lexicalEntry, i) => {

      lexicalEntry.entries.forEach((entry, j, ) => {

        entry.senses.forEach(((senses, k) => {
          // console.log('\n\n' + i + " " + j + " " + k, senses.definitions[0], '\n')

          definitions.push(senses.definitions);
        }))
      })
    });

    //keep only up to 3 results, more than that may be overwhelming
    definitions.splice(3);

    res.status(200).send({ provider, definitions, word })
  });
});

// @route /api/dictionaries/
// @desc Searches for entry in Merriam-Webster dictionary. If entry is not found, 
// sends final response to client with an object that accounts for no entry and no 
// provider. 

router.get('/merrian/:word', (req, res) => {
  const { word } = req.params;

  //Learners dictionary
  // const merrianWebsterKey = "635e05af-8833-45d3-9f00-d033b91c32c2";
  // const url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${merrianWebsterKey}`

  //Collegiante dictionary
  const merrianWebsterKey = "c424d379-91b3-484e-9555-ae1463109a82";//learners
  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${merrianWebsterKey}`

  fetch(url)
    .then(res => {
      return res.text();
    })
    .then(body => {
      body = JSON.parse(body);
      const definitions = []

      body.forEach((elm) => {
        //if there is a shortdef, push into array
        if (elm.shortdef) definitions.push(elm.shortdef[0]);
      });

      //keep only up to 3 results
      definitions.splice(3);

      //if a definitions is found, send object with results, else send dummy
      if (!definitions[0]) {
        res.status(200).send({
          provider: '',
          definitions: ['No definition found'],
          word
        })
      } else {
        res.status(200).send({ provider: "Merriam-Webster Online", definitions, word });
      }
    })
    .catch(err => console.error('\n ERROR in catch:\n', err));
});


module.exports = router;
