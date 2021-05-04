import "./Searchbox.css";

function Searchbox({ setSearchField }) {
  function handleChange(event) {
    setSearchField(event.target.value);
  }
  return (
    <div className="movie-title">
      <label className="form-label" htmlFor="search">
        Buscador
      </label>
      <div>
        <form action="">
          <input
            className="search"
            type="text"
            id="search"
            name="search"
            minLength="2"
            maxLength="50"
            placeholder="ingrese aquí su película..."
            onChange={handleChange}
            required
          />
        </form>
      </div>
    </div>
  );
}

export default Searchbox;
