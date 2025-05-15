import React, { useEffect, useState, useRef } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const divRef = useRef();
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  // scroll function left and right
  const scrollRight = () => {
    divRef.current.scrollLeft += 200; //move to the right
  };

  const scrollLeft = () => {
    divRef.current.scrollLeft -= 200; //move to the left
  };
  // end function
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close trailer
    } else {
      const items =
        movie?.title ||
        movie?.name ||
        movie?.original_name ||
        movie?.original_title;

      if (!items) {
        console.warn("No valid title for movie:", movie);
        return;
      }

      movieTrailer(items, { id: true })
        .then((videoId) => {
          if (videoId) {
            setTrailerUrl(videoId);
          } else {
            console.warn("No trailer found for:", items);
          }
        })
        .catch((error) => {
          console.error("Error finding trailer:", error);
        });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2 className="title">{title}</h2>

      <div className="row__posters" ref={divRef}>
        <button onClick={scrollLeft} className="arrow left">
          <MdKeyboardArrowLeft />
        </button>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
        {/* click on butto scroll to the right */}
        <button onClick={scrollRight} className="arrow right">
          <IoIosArrowForward />
        </button>
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
