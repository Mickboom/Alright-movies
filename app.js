
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


const apiKey = '69398c8228ad0ef2282393e5c5e98323'; // Badilisha na API yako halali
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
