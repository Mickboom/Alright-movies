const apiKey = '69398c8228ad0ef2282393e5c5e98323'
const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

const moviesContainer = document.getElementById('movies');

// Pata filamu zinazovuma
async function fetchTrendingMovies() {
  try {
    const response = await fetch(trendingMoviesUrl);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

// Pata video za sinema kwa ID ya sinema
async function fetchMovieVideo(movieId) {
  try {
    const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
    const response = await fetch(videoUrl);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    console.error(`Error fetching video for movie ID ${movieId}:`, error);
    return null;
  }
}

// Onyesha filamu na video
async function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  for (const movie of movies) {
    const videoUrl = await fetchMovieVideo(movie.id);

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = videoUrl
      ? `
        <iframe 
          width="100%" 
          height="200" 
          src="${videoUrl}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
      `
      : `
        <h3>${movie.title}</h3>
        <p>Rating: ${movie.vote_average}</p>
        <p>No trailer available</p>
      `;

    moviesContainer.appendChild(movieElement);
  }
}

// Anza kupakia filamu
fetchTrendingMovies();

async function fetchTrendingMovies() {
  try {
    const response = await fetch(trendingMoviesUrl);
    const data = await response.json();
    console.log(data); // Hii itakusaidia kuona data iliyopatikana
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}



async function searchMovies() {
  const query = document.getElementById('search').value.trim();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = ''; // Safisha mapendekezo

  if (query.length < 3) return;

  try {
      const response = await fetch(`${apiUrl}${apiKey}&query=${query}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
          data.results.slice(0, 5).forEach(movie => {
              const suggestion = document.createElement('div');
              suggestion.innerHTML = `
                  <h3>${movie.title}</h3>
                  <p>${movie.overview || "Hakuna maelezo."}</p>
                  <p><strong>Release Date:</strong> ${movie.release_date || "N/A"}</p>
                  <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">Tazama Maelezo</a>
              `;
              suggestionsDiv.appendChild(suggestion);
          });
      } else {
          suggestionsDiv.innerHTML = '<p>Hakuna matokeo.</p>';
      }
  } catch (error) {
      console.error('Hitilafu:', error);
      suggestionsDiv.innerHTML = '<p>Hitilafu katika utafutaji. Tafadhali jaribu tena.</p>';
  }
}


async function getTrailer(movieId) {
  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
  try {
      const response = await fetch(trailerUrl);
      const data = await response.json();
      const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
      console.error('Error fetching trailer:', error);
      return null;
  }
}


async function searchMovies() {
  const query = document.getElementById('search').value.trim();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';

  if (query.length < 3) return;

  try {
      const response = await fetch(`${apiUrl}${apiKey}&query=${query}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
          for (const movie of data.results.slice(0, 5)) {
              const suggestion = document.createElement('div');
              const trailerLink = await getTrailer(movie.id);

              suggestion.innerHTML = `
                  <h3>${movie.title}</h3>
                  <p>${movie.overview || "Hakuna maelezo."}</p>
                  <p><strong>Release Date:</strong> ${movie.release_date || "N/A"}</p>
                  ${trailerLink ? `<a href="${trailerLink}" target="_blank">Tazama Trailer</a>` : "Hakuna Trailer"}
              `;
              suggestionsDiv.appendChild(suggestion);
          }
      } else {
          suggestionsDiv.innerHTML = '<p>Hakuna matokeo.</p>';
      }
  } catch (error) {
      console.error('Hitilafu:', error);
      suggestionsDiv.innerHTML = '<p>Hitilafu katika utafutaji. Tafadhali jaribu tena.</p>';
  }
}



document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    if (data.success) {
      alert("Login Successful!");
      loadMovies();
    } else {
      alert("Login Failed!");
    }
  });
  
  async function loadMovies() {
    const response = await fetch("http://localhost:5000/api/movies");
    const movies = await response.json();
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.textContent = movie.title;
      movieList.appendChild(li);
    });
  }
  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<span>${movie.title}</span>
      <button class="btn btn-success btn-sm"><i class="fas fa-download"></i> Download</button>`;
    movieList.appendChild(li);
  });

  // Example movie data
const movies = [
    { id: 1, title: "Inception", img: "https://via.placeholder.com/300x450" },
    { id: 2, title: "Avengers: Endgame", img: "https://via.placeholder.com/300x450" },
    { id: 3, title: "The Dark Knight", img: "https://via.placeholder.com/300x450" },
    { id: 4, title: "Interstellar", img: "https://via.placeholder.com/300x450" },
  ];
  
  // Reference to the movie container
  const movieContainer = document.getElementById("movie-container");
  
  // Function to display movies
  function displayMovies(movieList) {
    movieContainer.innerHTML = ""; // Clear existing movies
    movieList.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className = "col-md-3 mb-4";
      movieCard.innerHTML = `
        <div class="card">
          <img src="${movie.img}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <button class="btn btn-danger w-100"><i class="fas fa-play"></i> Watch Now</button>
          </div>
        </div>
      `;
      movieContainer.appendChild(movieCard);
    });
  }
  
  // Initial display of all movies
  displayMovies(movies);

  import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

function recommendMovies(userHistory) {
  const recommendations = getRecommendations(userHistory); // Logic ya filamu inayotegemea historia
  const container = document.getElementById('movie-container');
  recommendations.forEach(movie => {
    const movieElement = `
      <div class="col-md-3 mb-4">
        <div class="card">
          <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.description}</p>
          </div>
        </div>
      </div>`;
    container.innerHTML += movieElement;
  });
}

document.getElementById('language-switcher').addEventListener('change', function(e) {
  const selectedLanguage = e.target.value;
  // Logic ya kubadili lugha
  alert('Language switched to ' + selectedLanguage);
});

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const title = document.getElementById('search-title').value.toLowerCase();
  const genre = document.getElementById('search-genre').value.toLowerCase();
  const year = document.getElementById('search-year').value;

  fetchMovies(title, genre, year);
});

function fetchMovies(title, genre, year) {
  const movies = [
    { title: "Inception", genre: "action", year: 2010 },
    { title: "The Dark Knight", genre: "action", year: 2008 },
    { title: "Avengers: Endgame", genre: "action", year: 2019 },
    { title: "Inside Out", genre: "comedy", year: 2015 },
  ];

  const filteredMovies = movies.filter(movie => {
    return (!title || movie.title.toLowerCase().includes(title)) &&
           (!genre || movie.genre.toLowerCase() === genre) &&
           (!year || movie.year.toString() === year);
  });

  displayMovies(filteredMovies);
}

function displayMovies(movies) {
  const container = document.getElementById('movie-container');
  container.innerHTML = "";

  if (movies.length === 0) {
    container.innerHTML = "<p class='text-danger'>No movies found.</p>";
    return;
  }

  movies.forEach(movie => {
    const movieCard = `
      <div class="col-md-3 mb-4">
        <div class="card">
          <img src="https://via.placeholder.com/300x400" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">Genre: ${movie.genre}<br>Year: ${movie.year}</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += movieCard;
  });
}

const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
function darktheme() {
     document.querySelector("body").style.backgroundColor = "black";
     document.querySelector("p").style.color = "white";
     
}

let watchlist = [];

function addToWatchlist(movie) {
  watchlist.push(movie);
  alert(`${movie} has been added to your Watchlist!`);
}

document.querySelectorAll('.add-watchlist').forEach(button => {
  button.addEventListener('click', () => {
    const movieName = button.getAttribute('data-movie-name');
    addToWatchlist(movieName);
  });
});

AOS.init();

document.getElementById('signup-link').addEventListener('click', function (e) {
  e.preventDefault();
  alert('Redirecting to Sign Up Page!');
});


fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => {
    const trendingMovies = data.results;
    const container = document.getElementById('trending-movies');
    trendingMovies.forEach(movie => {
      const movieElement = `
        <div class="col-md-3">
          <div class="card">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
              <h5 class="card-title">${movie.title}</h5>
              <p class="card-text">${movie.release_date}</p>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += movieElement;
    });
  });


  document.getElementById('login-form').addEventListener('submit', function (e) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
      e.preventDefault();
      alert('Please fill in all fields.');
    }
  });
  
  const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');

// Toggle search bar visibility
searchIcon.addEventListener('click', () => {
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'block'; // Show search bar
  } else {
    searchBar.style.display = 'none'; // Hide search bar
  }
});






  
  
  