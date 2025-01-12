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

const apiKey = '69398c8228ad0ef2282393e5c5e98323';
const baseUrl = 'https://api.themoviedb.org/3';

// Fetch Movies Function
async function fetchMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}

// Display Movies in the Main Container
function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <a href="https://www.themoviedb.org/movie/${movie.id}" class="details-btn" target="_blank">More Details</a>
        `;
        container.appendChild(movieCard);
    });
}

// Trending Movies
document.getElementById('trending-link').addEventListener('click', async () => {
    const movies = await fetchMovies(`${baseUrl}/trending/movie/day?api_key=${apiKey}`);
    displayMovies(movies, 'results-container');
});

// Watchlist Placeholder (To be replaced with user-specific data)
document.getElementById('watchlist-link').addEventListener('click', () => {
    const container = document.getElementById('results-container');
    container.innerHTML = `<p>Your watchlist is empty. Add movies to your watchlist to view them here!</p>`;
});

// K-Dramas
document.getElementById('kdramas-link').addEventListener('click', async () => {
    const movies = await fetchMovies(`${baseUrl}/discover/tv?api_key=${apiKey}&with_original_language=ko`);
    displayMovies(movies, 'results-container');
});

// Chinese Movies
document.getElementById('chinese-link').addEventListener('click', async () => {
    const movies = await fetchMovies(`${baseUrl}/discover/movie?api_key=${apiKey}&with_original_language=zh`);
    displayMovies(movies, 'results-container');
});

