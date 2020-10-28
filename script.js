const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
//const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${apiKey}`;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  console.log('Current Array', page, currentArray);
  currentArray.forEach((result) => {
    //resultsArray.photos.forEach((result) => {
      // card container
      const card = document.createElement('div');
      card.classList.add('card');
      // link
      const link = document.createElement('a');
      link.href = result.url;
      link.title = 'View Full Image';
      link.target = '_blank';
      // image
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = result.url;
      //img.src = result.img_src;
      img.alt = 'Mars Rover Photos';
      img.loading = 'lazy';
      // Card body
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      // Title
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = result.title;
      //cardTitle.textContent = result.rover.name;
      // Save Text
      const saveText = document.createElement('p');
      saveText.classList.add('clickable');
      saveText.textContent = 'Add to Favorates';
      //saveText.onclick = `saveFavorite('${result.url}')`;
      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
      //console.log(`'${result.url}'`);
      //saveText.onclick = `saveFaverite('${result.img_src}')`
      // Card Text
      const cardText = document.createElement('p');
      cardText.textContent = result.explanation;
      // Footer Container
      const footer = document.createElement('small');
      footer.classList.add('text-muted');
      // Date
      const date = document.createElement('strong');
      date.textContent = result.date;
      // Copyright
      const copyrightResult = result.copyright === undefined ? '' : result.copyright;
      const copyright = document.createElement('span');
      copyright.textContent = `${copyrightResult}`;
      //date.textContent = result.earth_date;
      // Append
      footer.append(date, copyright);
      cardBody.append(cardTitle, saveText, cardText, footer);
      link.appendChild(img);
      card.append(link, cardBody);
      //console.log(copyright);
      imagesContainer.appendChild(card);
    });
}

function updateDOM(page) {
  // Get Favorites from localStorage
  if (localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  createDOMNodes(page);
}


// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM('favorites');
  } catch (error) {
    console.log(error);
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      console.log(favorites);
      // Show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

getNasaPictures()