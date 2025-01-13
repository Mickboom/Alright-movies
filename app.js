const apiKey = 'YOUR_TMDB_API_KEY';
const movieSearchInput = document.getElementById('movie-search');
const searchButton = document.getElementById('search-btn');
const trendingMoviesContainer = document.getElementById('trending-movies-list');
const trailerContainer = document.getElementById('trailer-container');

// Search Button Functionality
searchButton.addEventListener('click', async () => {
    const query = movieSearchInput.value;
    if (query) {
        const results = await fetchMovies(query);
        displayMovies(results);
    }
});

// Fetch Movies
async function fetchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    return data.results;
}

// Display Movies
function displayMovies(movies) {
    trendingMoviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieElement.appendChild(movieImage);

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieElement.appendChild(movieTitle);

        const movieTrailerButton = document.createElement('button');
        movieTrailerButton.textContent = 'Watch Trailer';
        movieTrailerButton.addEventListener('click', () => fetchMovieTrailer(movie.id));
        movieElement.appendChild(movieTrailerButton);

        trendingMoviesContainer.appendChild(movieElement);
    });
}

// Fetch Movie Trailer
async function fetchMovieTrailer(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
    const data = await response.json();
    const trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    if (trailer) {
        displayTrailer(trailer.key);
    }
}

// Display Trailer
function displayTrailer(trailerKey) {
    trailerContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

// Fetch Trending Movies on Page Load
async function fetchTrendingMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`);
    const data = await response.json();
    displayMovies(data.results);
}

fetchTrendingMovies();
