import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  let { id } = useParams();
  const MovieIdApi = `https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1`;

  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetch(MovieIdApi)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setisLoading(false);
        if (data.success === false) {
          setmovieNotFound(true);
        }
      });
  }, []);

  const [isLoading, setisLoading] = useState(true);
  const [movieNotFound, setmovieNotFound] = useState(false);

  return (
    <div>
      {isLoading ? (
        <div class="spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {movieNotFound ? (
            <p>Movie not found</p>
          ) : (
            <div>
              <h1>{movie.title}</h1>
              <h1>{movie.overview}</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieDetails;
