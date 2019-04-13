
let controller = new AbortController();
let signal = controller.signal;


export default function (word) {
  return fetch(`/api/dictionaries/oxford/${word}`)
    .then(function (response) {

      //if word is found, status will be 200
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
      if (error) console.log(error);
    });
}


let definitionsSection = document.querySelector('section.definitions');
let definitionH3 = document.createElement('h4');
let definitionUl = document.createElement('ol');
let definitionsDiv = document.createElement('div');

function showDefinition(bodyAsJson) {

  definitionsSection.innerHTML = '';//clear section
  const { provider, definitions, word } = bodyAsJson;

  definitionH3.innerHTML = word + ":";

  definitions.forEach((elm, i) => {
    definitionUl.innerHTML += `<li>${elm}</li>`;
  });
  console.log(definitionUl)

  // source if there is a provider
  if (provider) { definitionsDiv.innerHTML = "<b>Source:</b> " + provider; }

  definitionsSection.append(definitionH3);
  definitionsSection.append(definitionUl);
  definitionsSection.append(definitionsDiv);

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