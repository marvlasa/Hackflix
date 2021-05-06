import "./Movie.css";
import { Link } from "react-router-dom";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

function Movie({ title, poster_path, overview, vote_average, id }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className="movie shadow">
        <h1>{}</h1>
        <img src={IMG_API + poster_path} alt="" />
      </div>
    </Link>
  );
}

export default Movie;
