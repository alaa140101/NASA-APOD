// Mars Rover Photos

// NASA API
const count = 2;
const apiKey = 'DEMO_KEY';
// const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${count}&api_key=${apiKey}`;
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${count}&api_key=DEMO_KEY`;
let resultsArray = [];

// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    // console.log(resultsArray.photos[0].img_src);
    console.log(resultsArray);
  } catch (error) {
    console.log(error);
  }
}

getNasaPictures()