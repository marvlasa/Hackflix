import React from "react";
import Header from "../Header";
import InputRating from "../InputRating";
import Movie from "../Movie";

function HomePage({ setSearchField, setRatingValue, moviesApi, isLoading }) {
  return (
    <div>
      <Header setSearchField={setSearchField} />
      <InputRating setRatingValue={setRatingValue} />

      <div className="container">
        <div className="App">
          {moviesApi.map((item) => {
            return (
              <Movie
                id={item.id}
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
    </div>
  );
}

export default HomePage;
