const apiKey = 'f45e4b83b1dfc0a97ca3564d5a93fa94'; // TMDB API Key
const trendingMoviesContainer = document.getElementById('trending-movies');
const searchButton = document.getElementById('search-btn');
const movieSearchInput = document.getElementById('movie-search');
const searchResultsContainer = document.getElementById('search-results');

// Fetch and Display Trending Movies with Trailers
async function fetchTrendingMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`);
    const data = await response.json();
    displayMoviesWithTrailers(data.results, trendingMoviesContainer);
}

// Fetch and Display Searched Movies with Trailers
async function searchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    displayMoviesWithTrailers(data.results, searchResultsContainer);
}

// Fetch Trailer for a Movie
async function fetchMovieTrailer(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
}

// Display Movies with Trailers
async function displayMoviesWithTrailers(movies, container) {
    container.innerHTML = '';
    for (const movie of movies) {
        const trailerUrl = await fetchMovieTrailer(movie.id);
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-item');
        movieDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            ${trailerUrl ? `<iframe width="200" height="150" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>` : '<p>No trailer available</p>'}
        `;
        container.appendChild(movieDiv);
    }
}

// Event Listeners
searchButton.addEventListener('click', () => {
    const query = movieSearchInput.value.trim();
    if (query) searchMovies(query);
});

// Initialize
fetchTrendingMovies();
