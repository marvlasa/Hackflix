import "./Header.css";
import Searchbox from "./Searchbox";

function Header({ setSearchField }) {
  return (
    <div
      className="back-image"
      style={{ backgroundImage: "url(/img/kkhd.jpg)" }}
    >
      <div className="container">
        <div className="alignp">
          <p>Hackflix</p>
          <p>Home</p>
        </div>
        <div className="header-title">
          <h1>Tus películas favoritas!</h1>
          <p>
            Las mejores películas las encontras en Hackflix. Prepárate para
            recibir la grulla
          </p>
        </div>
        <Searchbox setSearchField={setSearchField} />
      </div>
    </div>
  );
}

export default Header;
