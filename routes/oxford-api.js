const fetch = require('node-fetch');
var Dictionary = require("oxford-dictionary-api");
const express = require('express');
const router = express.Router();

router.get('/oxford/:word', (req, res) => {
  const app_id = "1173d420";
  const app_key = "fd07bff2c06f70752c2a3ee36a3c5bab";
  const dict = new Dictionary(app_id, app_key);

  let definitions = [];

  const { word } = req.params;

  dict.find(`${word}/definitions`, function (error, data) {

    // pretty funky, but at least I can get the response
    if (error) {
      //if not on oxford, redirect to merrian
      res.redirect(`/api/dictionaries/merrian/${word}`);
      return;
    }

    const { provider } = data.metadata;

    data.results[0].lexicalEntries.forEach((lexicalEntry, i, arr) => {

      lexicalEntry.entries.forEach((entry, j, arr) => {

        entry.senses.forEach(((senses, k, arr) => {
          // console.log('\n\n' + i + " " + j + " " + k, senses.definitions[0], '\n')

          definitions.push(senses.definitions);
        }))
      })
    })

    //keep only 3 results
    definitions.splice(2);

    res.status(200).send({ provider, definitions, word })
  });
});

router.get('/merrian/:word', (req, res) => {
  const { word } = req.params;

  const merrianWebsterKey = "635e05af-8833-45d3-9f00-d033b91c32c2";
  fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${merrianWebsterKey}`)

    .then(res => {

      for (x in res) {
        // console.log(x)
      }
      return res.text();
    })
    .then(body => {

      body = JSON.parse(body);
      let definitions = []

      body.forEach((elm, i, arr) => {
        if (elm.shortdef) definitions.push(elm.shortdef[0]);
      });

      definitions.splice(2);

      if (!definitions[0]) {
        res.status(200).send({
          provider: '',
          definitions: ['No definition found'],
          word
        })
      } else {
        res.status(200).send({ provider: "MERRIAM-WEBSTER ONLINE", definitions, word });
      }
    })
    .catch(err => console.error('\n ERROR in catch:\n', err));
});


module.exports = router;

