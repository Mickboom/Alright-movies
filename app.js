
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `${proxyUrl}https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

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


const apiKey = '69398c8228ad0ef2282393e5c5e98323'; // Tumia apiKey iliyopo
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

// Function ya kupata Trending Movies
async function fetchTrendingMovies() {
    const trendingList = document.getElementById('trending-list');
    trendingList.innerHTML = ''; // Safisha matokeo ya zamani

    try {
        // Ombi la kuleta Trending Movies
        const response = await fetch(trendingUrl);

        if (!response.ok) {
            throw new Error('Hitilafu katika ombi la API');
        }

        const data = await response.json();

        // Onyesha Trending Movies
        if (data.results && data.results.length > 0) {
            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    <p>Popularity: ${movie.popularity.toFixed(1)}</p>
                    <p>Release Date: ${movie.release_date || 'N/A'}</p>
                    <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">More Info</a>
                `;
                trendingList.appendChild(movieCard);
            });
        } else {
            trendingList.innerHTML = '<p>No trending movies available at the moment.</p>';
        }
    } catch (error) {
        console.error('Hitilafu:', error.message);
        trendingList.innerHTML = `<p>${error.message}</p>`;
    }
}

// Piga function mara moja
fetchTrendingMovies();



const apiKey = // Tumia apiKey iliyopo
const movieId = 550; // Mfano wa ID ya filamu, unaweza kuchukua ID halisi kutoka API
const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

// Function ya kuleta Trailer na kuionyesha
async function fetchTrailer() {
    const trailerContainer = document.getElementById('trailer-container');
    trailerContainer.innerHTML = ''; // Safisha maudhui ya zamani

    try {
        const response = await fetch(trailerUrl);
        if (!response.ok) throw new Error('Failed to fetch trailer.');

        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

        if (trailer) {
            const videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
            const movieDetails = await fetchMovieDetails(); // Pata maelezo zaidi

            trailerContainer.innerHTML = `
                <iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                <button class="details-btn" onclick="window.open('${movieDetails.homepage || '#'}', '_blank')">
                    Maelezo Zaidi
                </button>
            `;
        } else {
            trailerContainer.innerHTML = '<p>Hakuna trailer inayopatikana kwa sasa.</p>';
        }
    } catch (error) {
        console.error('Error fetching trailer:', error.message);
        trailerContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function ya kuleta maelezo zaidi ya filamu
async function fetchMovieDetails() {
    const response = await fetch(movieDetailsUrl);
    if (!response.ok) throw new Error('Failed to fetch movie details.');
    return await response.json();
}

// Piga function mara moja
fetchTrailer();


const apiKey = // Tumia apiKey iliyopo

const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

async function fetchTrendingMovies() {
    const watchNowContainer = document.getElementById('watch-now-container');
    watchNowContainer.innerHTML = ''; // Safisha matokeo ya zamani

    try {
        const response = await fetch(trendingMoviesUrl);
        if (!response.ok) throw new Error('Failed to fetch trending movies.');

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            for (const movie of data.results) {
                // Pata trailer ya kila filamu
                const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;
                const trailerResponse = await fetch(trailerUrl);
                const trailerData = await trailerResponse.json();

                const trailer = trailerData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

                const movieCard = document.createElement('div');
                movieCard.classList.add('watch-card');

                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    ${
                        trailer
                            ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`
                            : '<p>No trailer available.</p>'
                    }
                    <a href="https://www.themoviedb.org/movie/${movie.id}" class="details-btn" target="_blank">Maelezo Zaidi</a>
                `;

                watchNowContainer.appendChild(movieCard);
            }
        } else {
            watchNowContainer.innerHTML = '<p>No trending movies available.</p>';
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error.message);
        watchNowContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Piga function mara moja
fetchTrendingMovies();



const apiKey = // Tumia apiKey iliyopo
const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

async function fetchTrendingMovies() {
    const watchNowContainer = document.getElementById('watch-now-container');
    watchNowContainer.innerHTML = ''; // Safisha matokeo ya zamani

    try {
        const response = await fetch(trendingMoviesUrl);
        if (!response.ok) throw new Error('Failed to fetch trending movies.');

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            for (const movie of data.results) {
                // Pata trailer ya kila filamu
                const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;
                const trailerResponse = await fetch(trailerUrl);
                const trailerData = await trailerResponse.json();

                const trailer = trailerData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

                const movieCard = document.createElement('div');
                movieCard.classList.add('watch-card');

                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    ${
                        trailer
                            ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`
                            : '<p>No trailer available.</p>'
                    }
                    <a href="https://www.themoviedb.org/movie/${movie.id}" class="details-btn" target="_blank">Maelezo Zaidi</a>
                `;

                watchNowContainer.appendChild(movieCard);
            }
        } else {
            watchNowContainer.innerHTML = '<p>No trending movies available.</p>';
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error.message);
        watchNowContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Piga function mara moja
fetchTrendingMovies();


