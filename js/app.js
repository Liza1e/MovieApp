const API_KEY = 'df8783eb-ed72-4b04-bd38-cb3ee8524a86';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=JANUARY&page=1';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const fetchData = (url) => {
  fetch(url, {
    method: 'GET',
    headers: {
        'X-API-KEY': 'df8783eb-ed72-4b04-bd38-cb3ee8524a86',
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(json => showMovies(json.releases))
    .catch(err => console.log(err))
}

fetchData(API_URL);

const fetchSearchData = (url) => {
  fetch(url, {
    method: 'GET',
    headers: {
        'X-API-KEY': 'df8783eb-ed72-4b04-bd38-cb3ee8524a86',
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())
    .then(json => showMovies(json.films))
    .catch(err => console.log(err))
}

const getClassByRate = (rating) => {
  if (rating > 7 ) {
    return 'green'
  } else if (rating > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

const showMovies = (data) => {
  const moviesContainer = document.querySelector('.movies')

  document.querySelector('.movies').innerHTML = ''

  data.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `<div class="movie__cover-inner">
    <img src="${movie.posterUrlPreview}" class="movie-cover"/>
    <div class="movie__cover--darkened"></div>
  </div>
  <div class="movie__info">
    <div class="movie__title">${movie.nameRu}</div>
    <div class="movie__category">${movie.genres.map(item => `${item.genre}`)}</div>
    ${movie.rating && (`<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>`)}
  </div>`;
  
  moviesContainer.appendChild(movieEl);
  });
}


const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apiSearchURL = `${API_URL_SEARCH}${search.value}`;

  if(search.value) {
    fetchSearchData(apiSearchURL);
    search.value = '';
  }
})