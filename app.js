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
  form.reset()
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
function loadKittens() {
  let storedKittens = JSON.parse(localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }

}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElement = document.getElementById("kitten")
  let kittenTemplate = ""
  kittens.forEach(x => {
    kittenTemplate += `
    <span class="card-dark ">
    <img src="https://robohash.org/${x.name}?set=set4" alt="https://robohash.org/set=set4"></img>
    <p class="mt-1 mb-1 ml-3">Name: ${x.name}</>
    <p id='${'mood' + '-' + (x.id)}' class="mt-1 mb-1 ml-3">Mood: ${x.mood}</p>
    <p id='${'affection' + '-' + (x.id)}' class="mt-1 mb-1 ml-3">Affection: ${x.affection}</p>
    <div class="d-flex space-between align-items-center ">
    <button class="danger" type="button" Name="PET" onclick='pet(${JSON.stringify(x.id)})'>Pet</button>
    <button class="button" type="button"  onclick='catnip(${JSON.stringify(x.id)})'>Catnip</button>
    </div>
    </span>
    `
    /*
    TODO: Temp storage area:
    console.log("log: ", kittenTemplate.toString())
    */
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
function pet(id) {
  let affectionElement = document.getElementById("affection-" + id)
  console.log("PetId: ", id)
  let KittenPtr = findKittenById(id)
  let randAffection = Math.random()
  console.log("Petting: ", KittenPtr.name, " Please do be careful")
  if (randAffection > 0.7) {
    KittenPtr.affection++
  } else {
    KittenPtr.affection--
  }
  affectionElement.innerHTML = ("Affection: " + KittenPtr.affection.toString())
  /* drawKittens() */
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */

function catnip(id) {
  let moodElement = document.getElementById("mood-" + id)
  let affectionElement = document.getElementById("affection-" + id)
  console.log("Catnip: ", id)
  let KittenPtr = findKittenById(id)
  console.log("Catnipping: ", KittenPtr.name, " A very good choice!")
  KittenPtr.affection = 5;
  KittenPtr.mood = "tolerate"
  affectionElement.innerHTML = "Affection: 5"
  moodElement.innerHTML = "Mood: tolerate"
  saveKittens()

  /* drawKittens()   Not needed any more aince updating DOM */
}

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

loadKittens()
drawKittens()

