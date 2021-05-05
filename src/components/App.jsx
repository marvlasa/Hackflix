import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Movie from "./Movie";
import Header from "./Header";
import InputRating from "./InputRating";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const [searchField, setSearchField] = useState("");
  const [ratingValue, setRatingValue] = useState(null);
  const [moviesApi, setMoviesApi] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${searchField}`;
  const SEARCH_API_RATING = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&vote_average.gte=${
    ratingValue * 2
  }&page=${pageNumber}`;

  const fetchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMoviesApi(data.results);
        setIsLoading(false);
      });
  };

  function handleScroll() {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      console.log("holaaa");
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let url = FEATURED_API;

    if (searchField !== "") {
      url = SEARCH_API;
    } else if (ratingValue && ratingValue !== "") {
      url = SEARCH_API_RATING;
    }
    fetchData(url);
  }, [searchField, ratingValue, SEARCH_API, SEARCH_API_RATING]);

  useEffect(() => {
    fetch(SEARCH_API_RATING)
      .then((res) => res.json())
      .then((data) => {
        setMoviesApi([...moviesApi, ...data.results]);
      });
    console.log(pageNumber);
  }, [pageNumber, SEARCH_API_RATING, moviesApi]);

  return (
    <>
      <Header setSearchField={setSearchField} />
      <InputRating setRatingValue={setRatingValue} />

      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <Route path="/about" component={MovieDetails} />
      </BrowserRouter>

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
      {!isLoading ? (
        <div class="spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : null}
    </>
  );
}

export default App;
