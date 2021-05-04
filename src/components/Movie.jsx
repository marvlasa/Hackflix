import "./Movie.css";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

function Movie({ title, poster_path, overview, vote_average }) {
  return (
    <div className="movie shadow">
      <h1>{}</h1>
      <img src={IMG_API + poster_path} alt="" />
    </div>
  );
}

export default Movie;
