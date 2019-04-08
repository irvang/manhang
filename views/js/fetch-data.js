//====INITIATES GAME once response is obtained.
// fetch('/words')
fetch('/words')
// fetch('../words.txt') //faster for testing purposes
    .then(function (response) {
        if (response.ok) {
            return response.text();//a promise
        } else {
            throw new Error('ERROR: Network response wat not ok.');
        }
    })
    .then(text => {

        //may have to restructure so that gui loads before all the response
        //====INITIATES GAME
        initGame(text.split('\n'));// passes as ALL_WORDS
    })
    .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
    });




// Original function I used for my typing game
//-------------------------------------
function stringOfWordsToArray(wordsToFilter) {

    //separate string by line breaks and join by spaces
    let arrayOfAllWords = wordsToFilter.split('\n').join(' ');

    //remove '.' / only one such entry
    arrayOfAllWords = arrayOfAllWords.split('.').join(' ');

    // remove ','
    arrayOfAllWords = arrayOfAllWords.split(',').join(' ');

    //split by spaces and returs array
    arrayOfAllWords = arrayOfAllWords.split(' ');

    return arrayOfAllWords;
}