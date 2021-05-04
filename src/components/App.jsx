import { useEffect, useState } from "react";
import "./App.css";

import Movie from "./Movie";
import Header from "./Header";
import InputRating from "./InputRating";

function App() {
  const [searchField, setSearchField] = useState("");

  const [ratingValue, setRatingValue] = useState(null);
  const [moviesApi, setMoviesApi] = useState([]);

  const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";

  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchField}`;
  const SEARCH_API_RATING = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&vote_average.gte=${
    ratingValue * 2
  }`;

  // let filteredMoviesByTitle = movieList.filter((movie) =>
  //   movie.title.toLowerCase().includes(searchField.toLowerCase())
  // );
  // let filteredMoviesByRating = movieList.filter((movie) => {
  //   return movie.vote_average >= ratingValue * 2;
  // });
  // if (ratingValue) {
  //   const filteredMovies = filteredMoviesByRating;
  // } else {
  //   const filteredMovies = filteredMoviesByTitle;
  // }
  // const filteredMovies =
  //   ratingValue !== null ? filteredMoviesByRating : filteredMoviesByTitle;

  useEffect(() => {
    let url = FEATURED_API;

    if (searchField !== "") {
      url = SEARCH_API;
    } else if (ratingValue && ratingValue !== "") {
      url = SEARCH_API_RATING;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMoviesApi(data.results);
      });
  }, [searchField, ratingValue, SEARCH_API, SEARCH_API_RATING]);

  return (
    <>
      <Header setSearchField={setSearchField} />

      <InputRating setRatingValue={setRatingValue} />

      <div className="container">
        <div className="App">
          {moviesApi.map((item) => {
            return (
              <Movie
                key={item.id}
                title={item.title}
                poster_path={item.poster_path}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
