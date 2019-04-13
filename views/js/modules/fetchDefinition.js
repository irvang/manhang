export default function (word) {
  return fetch(`/api/dictionaries/oxford/${word}`)
    .then(function (response) {
      console.log("response:", response)

      //if word is found, will be 200, else will be 204
      if (response.status === 200) {
        return response.json();//a promise, convert to object
      } else {
        console.log('requesting merrian')
        // return response.json();//a promise, convert to object
        requestMerrian(word)
      }
    })
    .then(bodyAsJson => {

      //if here, show definition on page
      showDefinition(bodyAsJson);

    })
    .catch(error => console.log('ERROR: \n', error));
}

function requestMerrian(word) {
  return fetch(`/api/dictionaries/merrian/${word}`)
    .then(function (response) {


      //if word is found, will be 200, else will be 204
      if (response.status === 200) {
        return response.json();//a promise, convert to object
      } else {

        //if here, show NO definition message on page
        showDefinition({
          provider: 'no provider',
          definitions: ['No definition found']
        });
      }
    })
    .then(bodyAsJson => {

      //if here, show definition on page
      console.log("at end merrian", bodyAsJson)

      showDefinition(bodyAsJson);
    })
    .catch(error => console.log('ERROR: \n', error));
}

function showDefinition(bodyAsJson) {
  const { provider, definitions } = bodyAsJson;

  console.log(provider, definitions);
}