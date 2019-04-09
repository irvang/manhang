/* 
App deployed in heroku here: https://manhang-irv.herokuapp.com/
*/

//====PORT
const PORT = process.env.PORT || 3000;

const fetch = require('node-fetch');

const express = require('express')
// const cors = require('cors')
const app = express()



const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(bodyParser.text({ type: 'text/html' }))
// app.use(bodyParser.text({ type: 'text/plain' }))
// https://github.com/expressjs/express/wiki#template-engines
// app.set('view engine', 'ejs')
app.use('/', express.static('views'))


app.get('/', function (req, res, next) {
  // res.send(express.static('../index.html'))
  // res.render('index.html')
  res.render();
});


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

app.get('/words/:difficulty/:minLength/:maxLength', function (req, res, next) {

  /* To use the different queries in api: http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  const { difficulty, minLength, maxLength } = req.params;
  
  const parameters = `difficulty=${difficulty}&minLength=${minLength}&maxLength=${maxLength}`;
  console.log(parameters)

  fetch(`http://app.linkedin-reach.io/words?${parameters}`)
    // fetch('/words.txt')
    .then(res => res.text())
    .then(body => {
      // res.render("index", { word_data: body })
      res.send(body)
    });

});

// you had this before the app.get('/') route, so it went to send static file first
// app.use('/', express.static('views'));//rendering static html

app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});