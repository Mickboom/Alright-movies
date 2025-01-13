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

async function fetchMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}

async function fetchTrailer(movieId) {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await response.json();
    const trailers = data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailers.length > 0 ? trailers[0].key : null;
}

function displayMoviesWithTrailers(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    movies.forEach(async (movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        const trailerKey = await fetchTrailer(movie.id);

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="trailer-btn" data-trailer-key="${trailerKey}">Watch Trailer</button>
        `;
        container.appendChild(movieCard);
    });

    // Add Event Listeners for Trailer Buttons
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('trailer-btn')) {
            const trailerKey = e.target.getAttribute('data-trailer-key');
            if (trailerKey) {
                showTrailer(trailerKey);
            } else {
                alert('Trailer not available for this movie.');
            }
        }
    });
}

function showTrailer(trailerKey) {
    const modal = document.getElementById('trailer-modal');
    const trailerVideo = document.getElementById('trailer-video');
    trailerVideo.src = `https://www.youtube.com/embed/${trailerKey}`;
    modal.style.display = 'flex';
}

function closeTrailer() {
    const modal = document.getElementById('trailer-modal');
    const trailerVideo = document.getElementById('trailer-video');
    trailerVideo.src = ''; // Stop the video
    modal.style.display = 'none';
}

// Close modal when the close button is clicked
document.querySelector('.close-btn').addEventListener('click', closeTrailer);

// Fetch and display trending movies with trailers
document.addEventListener('DOMContentLoaded', async () => {
    const trendingMovies = await fetchMovies(`${baseUrl}/trending/movie/day?api_key=${apiKey}`);
    displayMoviesWithTrailers(trendingMovies, 'results-container');
});
