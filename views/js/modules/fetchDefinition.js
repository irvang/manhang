import state from "./state.js";

export { clearDefinitionsSection, showDefinitions };

// @desc Sends a request to server to get a definition from the different
// dictionaries. Server then sends a request to the different
// dictionaries' APIs. The first set of definitions found will be returned.
export default async function fetchDefinition() {
  if (state.isPhrase) {
    //definition should already be on element
    return;
  }

  try {
    const response = await fetch(
      `/api/dictionaries/oxford/${state.singleWord}`
    );

    if (response.status === 200) {
      const body = await response.json(); //a promise, convert to object
      storeDictionaryDefinition(body);
    } else {
      throw new Error("Got some not-200 code");
    }
  } catch (error) {
    console.error(error);
  }

  // return fetch(`/api/dictionaries/oxford/${state.singleWord}`)
  //   .then(async function (response) {
  //     console.log("Response", response);
  //     // status will be 200 regardless, to avoid 400 errors
  //     // an object with "No definiitons found" will be sent
  //     // if no definition is found
  //     if (response.status === 200) {
  //       return response.json(); //a promise, convert to object
  //     }
  //   })
  //   .then((body) => {
  //     // body = {string: provider, array: definitions, string: word}
  //     storeDictionaryDefinition(body);
  //   })
  //   .catch((error) => {
  //     if (error) console.error(error);
  //   });
}

function storeDictionaryDefinition(body) {
  state.singleWord = body.word;
  state.definitions = [...body.definitions];
  state.provider = body.provider;
}

// get element, and create elements to hold the data
let definitionsSection = document.querySelector("section.definitions");
let definitionH3 = document.createElement("h4");
let definitionOl = document.createElement("ul");
let definitionsDiv = document.createElement("div");

// uses elements above to display the data:
// {string provider, array definitions, string word}
function showDefinitions() {
  definitionsSection.innerHTML = ""; //clear section
  const { provider, definitions, singleWord } = state;

  definitionH3.innerHTML = singleWord + ":";

  // loop through array, create li with definition and append to ol
  definitions.forEach((elm, i) => {
    definitionOl.innerHTML += `<li>${elm}</li>`;
  });

  // Show source (provider) only if there is one
  if (provider) {
    definitionsDiv.innerHTML = "<b>Source:</b> " + provider;
  }

  definitionsSection.append(definitionH3);
  definitionsSection.append(definitionOl);
  definitionsSection.append(definitionsDiv);
}

// @desc clears the definitions section
// I am definint it here because of this module's relation to the section
function clearDefinitionsSection() {
  //clear div and each of the elements
  definitionsSection.innerHTML = `<p> </p>`;

  definitionH3.innerHTML = "";
  definitionOl.innerHTML = "";
  definitionsDiv.innerHTML = "";
}
