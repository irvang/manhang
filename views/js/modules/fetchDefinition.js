export default function (word) {
  return fetch(`/api/dictionaries/${word}`)
    .then(function (response) {
      console.log("response:", response)

      //if word is found, will be 200, else will be 204
      if (response.status === 200) {
        return response.json();//a promise, convert to object
      } 
    })
    .then(bodyAsJson => {


      console.log("at end", bodyAsJson)
    })
    .catch(error => console.log('ERROR: \n', error));
}