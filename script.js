const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const page = 1;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${apiKey}`;
let resultsArray = [];

function updateDOM() {
  resultsArray.photos.forEach((result) => {
    console.log(result.img_src);
    // card container
    const card = document.createElement('div');
    card.classList.add('card');
    // link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // image
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = result.img_src;
    img.alt = 'Mars Rover Photos';
    img.loading = 'lazy';
    // Card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.rover.name;
    // Save
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add to Favorates';
    // footer
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.earth_date;
    // Append
    footer.appendChild(date);
    cardBody.append(cardTitle, saveText, footer);
    link.appendChild(img);
    card.append(link, cardBody);
    //console.log(card);
    imagesContainer.appendChild(card);
  });
}


// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM();
  } catch (error) {
    console.log(error);
  }
}

getNasaPictures()