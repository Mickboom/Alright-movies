import React, { useEffect, useState } from "react";
import axios from "axios";

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4">Popular Movies</h2>
      <div className="row">
        {movies.map(movie => (
          <div className="col-md-3 mb-4" key={movie._id}>
            <div className="card">
              <img src={movie.thumbnail} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <button className="btn btn-danger w-100">Watch Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
