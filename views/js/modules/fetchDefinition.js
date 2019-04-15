import state from "./state.js";

// @desc Sends a request to server to get a definition from the different 
// dictionaries. Server then sends a request to the different 
// dictionaries' APIs. The first set of definitions found will be returned.
export default function fetchDefinition() {

  if(state.isPhrase) {
    //definition should already be on element
    return;
  }
  return fetch(`/api/dictionaries/oxford/${state.singleWord}`)
    .then(function (response) {

      // status will be 200 regardless, to avoid 400 errors
      // an object with "No definiitons found" will be sent
      // if no definition is found
      if (response.status === 200) {
        return response.json();//a promise, convert to object
      }
    })
    .then(body => {
      // body = {string: provider, array: definitions, string: word}
      storeDictionaryDefinition(body)

      //if here, show definition on page
      // showDefinition(body);
    })
    .catch(error => {
      if (error) console.log(error);
    });
}

function storeDictionaryDefinition(body) {
  state.singleWord = body.word;
  state.definitions = [...body.definitions];
  state.provider = body.provider;
}

// get element, and create elements to hold the data
let definitionsSection = document.querySelector('section.definitions');
let definitionH3 = document.createElement('h4');
let definitionOl = document.createElement('ul');
let definitionsDiv = document.createElement('div');

// uses elements above to display the data:
// {string provider, array definitions, string word}
export function showDefinitions() {

  definitionsSection.innerHTML = '';//clear section
  const { provider, definitions, singleWord } = state;

  definitionH3.innerHTML = singleWord + ":";

  // loop through array, create li with definition and append to ol
  definitions.forEach((elm, i) => {
    definitionOl.innerHTML += `<li>${elm}</li>`;
  });

  // Show source (provider) only if there is one 
  if (provider) { definitionsDiv.innerHTML = "<b>Source:</b> " + provider; }

  definitionsSection.append(definitionH3);
  definitionsSection.append(definitionOl);
  definitionsSection.append(definitionsDiv);

}

// @desc clears the definitions section
// I am definint it here because of this module's relation to the section
export function clearDefinitionsSection() {

  //clear div and each of the elements
  definitionsSection.innerHTML = `<p> </p>`;

  definitionH3.innerHTML = '';
  definitionOl.innerHTML = '';
  definitionsDiv.innerHTML = '';
}
