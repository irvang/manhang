/* 
App deployed in heroku here: https://manhang-irv.herokuapp.com/
*/

//====NPM MODULES
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const axios = require("axios");
//====CUSTOM MODULES
const dictionariesRouter = require("./routes/oxford-api");
const wordsRouter = require("./routes/words");
const wordsApiRouter = require("./routes/words-api");

//====PORT
const PORT = process.env.PORT || 3030;

//MIDDLEWARE
app.use(bodyParser.json());
app.use("/", express.static("views"));

app.use((req, res, next) => {
  console.log(req.baseUrl);
  next();
});
//====ROUTER
app.use("/api/dictionaries", dictionariesRouter);
app.use("/words", wordsRouter);
app.use("/words-api", wordsApiRouter);

//LANDING PAGE
app.get("/", function (req, res, next) {
  res.render();
});

//====SERVER CONNECTION
app.listen(PORT, function () {
  console.log("Server listening on port " + PORT);
});

//====UNUSED
/* Returns longest and shortest word lengths in array.
Needs input as array, not as JSON.
Used only for testing purposes.   */
function getShortestAndLongest(wordArray) {
  let min = wordArray[0].length,
    max = wordArray[0].length;

  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].length < min) min = wordArray[i].length;
    if (wordArray[i].length > max) max = wordArray[i].length;
  }

  return { shortestLengthInArray: min, longestLengthInArray: max };
}
