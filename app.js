const apiKey = '69398c8228ad0ef2282393e5c5e98323';
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

async function fetchMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            ${
                movie.video
                    ? `<iframe src="https://www.youtube.com/embed/${movie.video}" allowfullscreen></iframe>`
                    : '<p>No trailer available.</p>'
            }
            <a href="https://www.themoviedb.org/movie/${movie.id}" class="details-btn" target="_blank">More Details</a>
        `;
        container.appendChild(movieCard);
    });
}

// Search Movies
document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        const movies = await fetchMovies(`${searchUrl}${query}`);
        displayMovies(movies, 'results-container');
    }
});

// Display Trending Movies
(async function displayTrendingMovies() {
    const movies = await fetchMovies(trendingUrl);
    displayMovies(movies, 'watch-now-container');
})();
try {
    const response = await fetch(`${baseUrl}/trending/movie/day?api_key=${apiKey}`);
    const data = await response.json();
    return data.results.slice(0, 10); // Chukua movies 10 za kwanza
  } catch (error) {
    console.error('Error fetching trending movies:', error);
  }
}

async function fetchTrailer(movieId) {
  try {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
}

async function displayTrendingMovies() {
  const trendingContainer = document.getElementById('trending-container');
  const movies = await fetchTrendingMovies();

  for (const movie of movies) {
    const trailerKey = await fetchTrailer(movie.id);
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    movieDiv.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      ${trailerKey ? `<iframe src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>` : ''}
    `;

    trendingContainer.appendChild(movieDiv);
  }
}

displayTrendingMovies();