const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();

const axios = require("axios");

const getData = async (params) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://wordsapiv1.p.rapidapi.com/words/",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": process.env.WORDS_API_KEY,
        useQueryString: true,
      },
      params: {
        random: true,
        // letterPattern: /^[a-zA-Z0-9]*$/,
        letterPattern: "^[a-zA-Z]*$",
        // // pronunciationpattern: ".*%C3%A6m%24",
        limit: "100",
        // // page: "1",
        // letters: "5",
        lettersmin: "3",
        lettersMax: "17",
        // hasDetails: "hasDetails,typeof",
      },
    });
    console.clear();
    console.log(data);
    if (data.results) {
      console.log("SYNONYM", data.results[0].synonyms);

      console.log(
        "DEFINITIONS",
        data.results.map((item) => item.definition)
      );
    }
    if (data.syllables) {
      console.log("SYLLABLES", data.syllables);
    }
  } catch (error) {
    console.error(error);
  }
  // .then((response)=>{
  //   console.log(response)
  // })
  // .catch((error)=>{
  //   console.log(error)
  // })
};

getData();
// @route: GET / words
// @desc Get all words from Reach.io API.Uses fetch to get around the Cross -
//   Origin Resource Sharing(CORS) policy issue when requesting access directly
// from the front end.

router.get("/:difficulty/:minLength/:maxLength", (req, res) => {
  /* To use the different queries in api: 
  http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  const { difficulty, minLength, maxLength } = req.params;

  const parameters = `difficulty=${difficulty}&minLength=${minLength}&maxLength=${maxLength}`;

  fetch(`http://app.linkedin-reach.io/words?${parameters}`)
    .then((res) => {
      return res.text();
    })
    .then((body) => {
      // (typeof body) === string,
      //split by "\n" converts into an array; then stringify with JSON
      let ALL_WORDS = JSON.stringify(body.split("\n"));

      res.send(ALL_WORDS);
    })
    .catch((err) => console.error("\n ERROR in catch:\n", err));
});

// @route GET /words
// @desc Gets and formats phrases' data
router.get("/phrases", (req, res) => {
  let data = "";

  // to use path, __dirname as a starting directory is needed, absolut path would
  // require route as if it started on app.js, since it is where route is called
  // https://stackabuse.com/read-files-with-node-js/
  const readStream = fs.createReadStream(
    __dirname + "/../assets/phrases.txt",
    "utf8"
  );

  readStream
    .on("data", function (chunk) {
      data += chunk;
    })
    .on("end", function () {
      data = data.split("\n");

      let newArr = [];
      for (let i = 0; i < data.length; i++) {
        //add data[i] and at i+1
        //remove non-alphabet characters, since there is no input for those
        if (
          data[i].includes("’") ||
          data[i].includes("‘") ||
          data[i].includes("(") ||
          data[i].includes(")") ||
          data[i].includes(".") ||
          data[i].includes(",") ||
          data[i].includes("/") ||
          data[i].includes("-") ||
          data[i].includes(";")
        ) {
          i++;
          continue;
        }

        // length>2 so no one-space word (' ') selected
        if (data[i] !== "" && data[i].length > 2) {
          // keeping structure the same to make it easier
          // body = {string: provider, array: definitions, string: word}
          if (data[i])
            newArr.push({
              word: data[i], //phrase
              definitions: data[i + 1], //single definition
              provider: `<a href='https://knowyourphrase.com/' target='_blank'>Know Your Phrase </a>`,
            });
          //increase en extra one since value has been obtained already
          i++;
        }
      }

      res.status(200).send(newArr);
    });
});

module.exports = router;
