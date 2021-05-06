/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
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
  }, [searchField, ratingValue]);

  useEffect(() => {
    fetch(SEARCH_API_RATING)
      .then((res) => res.json())
      .then((data) => {
        setMoviesApi([...moviesApi, ...data.results]);
      });
    console.log(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <BrowserRouter>
        <Route
          path="/"
          exact
          render={() => (
            <HomePage
              setSearchField={setSearchField}
              setRatingValue={setRatingValue}
              moviesApi={moviesApi}
              isLoading={isLoading}
            />
          )}
        />
        <Switch>
          <Route path="/movie/:id" component={MovieDetails} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
