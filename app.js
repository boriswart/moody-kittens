// @ts-nocheck
/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let Kitten = {};

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  Kitten = {
    id: generateId(),
    name: form.name.value.toString(),
    mood: "tolerate",
    affection: 4
  }
  console.log(Kitten)
  kittens.push(Kitten)
  saveKittens()
  form.reset
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() { }

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kitten")
  let kittenTemplate = ""
  /*
  <h3 class="mt-1 mb-1 ml-3">Mood: ${x.mood}</h3>
  <h3 class="mt-1 mb-1 ml-3">Affection: ${x.affection}.toString()</h3>
  */

  kittens.forEach(x => {
    kittenTemplate += `
   <span class="card-dark ">
     <img src="https://robohash.org/${x.name}?set=set4" alt="https://robohash.org/set=set4"></img>
     <h3 class="mt-1 mb-1 ml-3">Name: ${x.name}</h3>
   </span>
   `
    console.log("log: ", kittenTemplate.toString())
  })
  kittenListElement.innerHTML = kittenTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) { }

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) { }

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) { }

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kitten").classList.remove("hidden")
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
