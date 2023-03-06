import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "../../search.svg";
import { API_KEY } from "../../config";
import "./MainPage.css";
import "../../App.css";

const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const MainPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search-result")
  );

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (searchTerm === null) {
      localStorage.setItem("search-result", "Shrek");
    } else {
      localStorage.setItem("search-result", searchTerm);
    }
    if (data.Search === undefined) {
      setMovies([]);
    } else {
      setMovies(data.Search);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("search-result") === null) {
      setSearchTerm("Shrek");
      searchMovie("Shrek");
      localStorage.setItem("search-result", "Shrek");
    } else {
      searchMovie(localStorage.getItem("search-result"));
    }
  }, []);

  return (
    <div className="app">
      <h1>The Cinema Universe</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            searchMovie(searchTerm);
          }}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default MainPage;
