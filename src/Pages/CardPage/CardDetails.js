import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CardDetails.css";
import { API_KEY } from "../../config";

const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const CardDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState([]);

  const searchMovieById = async (id) => {
    const response = await fetch(`${API_URL}&i=${id}&plot=full`);
    const data = await response.json();
    setMovie(data);
  };

  useEffect(() => {
    searchMovieById(imdbID);
  }, []);

  return (
    <>
      <div className="container">
        <h1>The Cinema Universe</h1>
        <div className="movie_card">
          <div className="movie_card-left">
            <div>{movie.Title}</div>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/400"
              }
              alt={movie.Title}
            />
          </div>
          <div className="movie_card-right">
            <div>
              <span>Ratings:</span>{" "}
              {movie.imdbRating === "N/A"
                ? "No information available"
                : movie.imdbRating}
            </div>
            <div>
              <span>Release date:</span>{" "}
              {movie.DVD === "N/A" ? "No information available" : movie.DVD}
            </div>
            <div>
              <span>Country:</span> {movie.Country}
            </div>
            <div>
              <span>Directors:</span> {movie.Director}
            </div>
            <div>
              <span>Genre:</span> {movie.Genre}
            </div>
            <div>
              <span>Actors:</span> {movie.Actors}
            </div>
            <div>
              <span>Box Office:</span>{" "}
              {movie.BoxOffice === "N/A"
                ? "No information available"
                : movie.BoxOffice}
            </div>

            <Link to="/">Back to Main Page</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
