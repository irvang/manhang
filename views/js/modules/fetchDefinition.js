
let controller = new AbortController();
let signal = controller.signal;


// perhaps redirect inside of express
export default function (word) {
  return fetch(`/api/dictionaries/oxford/${word}`, {
    signal: signal
  })
    .then(function (response) {
      console.log("response:", response)

      //if word is found, will be 200, else will be 204
      if (response.status === 200) {
        return response.json();//a promise, convert to object
      } else {
        console.log('requesting merrian')
      }
    })
    .then(bodyAsJson => {

      //if here, show definition on page
      showDefinition(bodyAsJson);

    })
    .catch(error => {
      if (error.name == 'AbortError') { // handle abort()
        console.error("Aborted!", error);
      } else {
        // throw err;
        console.log('ERROR: \n', error)
      }
    })
}


const definitionsSection = document.querySelector('section.definitions');
const definitionH3 = document.createElement('h3');
const definitionUl = document.createElement('ul');
const definitionsDiv = document.createElement('div');

function showDefinition(bodyAsJson) {
  console.log('bodyAsJson line 60', bodyAsJson)
  const { provider, definitions, word } = bodyAsJson;

  definitionH3.innerHTML = word + ":";

  definitions.forEach((elm, i) => {
    definitionUl.innerHTML += `<li>${elm}</li>`;
  });

  if (provider) { definitionsDiv.innerHTML = "Source: " + provider; }

  definitionsSection.innerHTML += definitionH3.innerHTML;
  definitionsSection.innerHTML += definitionUl.innerHTML;
  definitionsSection.innerHTML += definitionsDiv.innerHTML;

  console.log(provider, definitions);
}

export function clearDefinitionsSection() {

  //clear div and each of the elements
  definitionsSection.innerHTML = `<p> </p>`;

  definitionH3.innerHTML = '';
  definitionUl.innerHTML = '';
  definitionsDiv.innerHTML = '';
}

//NOW UNUSED, REDIRECTING ON SERVER
function requestMerrian(word) {
  return fetch(`/api/dictionaries/merrian/${word}`)
    .then(function (response) {


      //if word is found, will be 200, else will be 204
      if (response.status === 200) {
        return response.json();//a promise, convert to object
      }
      // else {

      //   console.log("at end merrian no def")
      //   //if here, show NO definition message on page
      //   return {
      //     provider: 'no provider',
      //     definitions: ['No definition found']
      //   }

      // }
    })
    .then(bodyAsJson => {

      //if here, show definition on page
      console.log("at end merrian", bodyAsJson)

      showDefinition(bodyAsJson);
    })
    .catch(error => console.log('ERROR: \n', error));
}