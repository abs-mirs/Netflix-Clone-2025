import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        console.log(response);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Row.js - Error fetching movies:", error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const movieTitleQuery =
        movie?.title ||
        movie?.name ||
        movie?.original_name ||
        movie?.original_title ||
        "";

      if (!movieTitleQuery) {
        return;
      }

      movieTrailer(movieTitleQuery, { id: true, multi: false })
        .then((videoId) => {
          if (videoId) {
            setTrailerUrl(videoId);
          }
        })
        .catch((error) => {
          // console.error(`Row.js - Error finding trailer for ${movieTitleQuery}:`, error);
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

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            src={`${base_url}${
              isLargeRow && movie.poster_path
                ? movie.poster_path
                : movie.backdrop_path
            }`}
            alt={
              movie.name || movie.title || movie.original_name || "Movie poster"
            }
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

/*
 * == Row Component: Crucial Code Explanation ==
 *
 * This component displays a scrollable row of movie posters and can show a YouTube trailer.
 *
 * --- Imports ---
 * - `React, { useEffect, useState }`: Core React library. `useEffect` for side effects (like data fetching), `useState` for managing component state.
 * - `./row.css`: Styles specific to this row component.
 * - `axios`: A library for making HTTP requests (to get movie data).
 * - `movieTrailer`: A library to find movie trailer URLs (usually YouTube links).
 * - `YouTube`: A React component to easily embed YouTube videos.
 *
 * --- Component Definition ---
 * - `function Row({ title, fetchUrl, isLargeRow })`: Defines the `Row` component.
 *   - `title`: Prop for the row's heading (e.g., "Trending Now").
 *   - `fetchUrl`: Prop for the API endpoint to get movies for this row.
 *   - `isLargeRow`: Prop (boolean) to indicate if posters should use a larger style.
 *
 * --- State Variables ---
 * - `const [movies, setMovies] = useState([]);`:
 *   - `movies`: An array that will hold the list of movie objects. Starts empty.
 *   - `setMovies`: A function to update the `movies` array.
 * - `const [trailerUrl, setTrailerUrl] = useState("");`:
 *   - `trailerUrl`: A string that will hold the YouTube video ID for the trailer. Starts empty (no trailer).
 *   - `setTrailerUrl`: A function to update the `trailerUrl`.
 *
 * --- Constants ---
 * - `const base_url = "https://image.tmdb.org/t/p/original";`:
 *   - The base URL for fetching movie poster images from TMDb.
 *
 * --- Data Fetching (`useEffect`) ---
 * - `useEffect(() => { ... }, [fetchUrl]);`:
 *   - This block runs after the component mounts and whenever `fetchUrl` changes.
 *   - `const fetchData = async () => { ... }`: An asynchronous function to get movie data.
 *   - `const response = await axios.get(fetchUrl);`: Makes an API call using `axios` to the `fetchUrl`.
 *   - `setMovies(response.data.results);`: Updates the `movies` state with the results from the API.
 *
 * --- Poster Click Handler (`handleClick`) ---
 * - `const handleClick = (movie) => { ... };`: This function runs when a movie poster is clicked.
 *   - `if (trailerUrl)`: Checks if a trailer is already playing.
 *     - `setTrailerUrl("");`: If yes, it closes the trailer by clearing `trailerUrl`.
 *   - `else`: If no trailer is playing.
 *     - `const movieTitleQuery = ...`: Tries to get a title from the clicked `movie` object.
 *     - `movieTrailer(movieTitleQuery, { id: true, multi: false })`: Uses `movie-trailer` library to find the YouTube video ID for the movie.
 *       - `{ id: true }`: Asks the library to return just the video ID.
 *     - `.then((videoId) => { ... })`: If a video ID is found:
 *       - `setTrailerUrl(videoId);`: Sets the `trailerUrl` state, which will cause the YouTube player to render.
 *
 * --- YouTube Player Options (`opts`) ---
 * - `const opts = { ... };`: Configuration options for the `YouTube` component.
 *   - `height: "390", width: "100%"`: Sets the dimensions of the player.
 *   - `playerVars: { autoplay: 1 }`: Tells the player to start playing automatically when it loads.
 *
 * --- JSX (Component Rendering) ---
 * - `<div className="row">`: The main container for the entire row.
 * - `<h2 className="title">{title}</h2>`: Displays the row's title.
 * - `<div className="row__posters">`: The horizontally scrollable container for the movie posters.
 *   - `{movies.map((movie) => ( ... ))}`: Loops through the `movies` array and renders an `<img>` for each.
 *     - `<img ... />`: Represents a single movie poster.
 *       - `key={movie.id}`: A unique key for React to efficiently update the list.
 *       - `onClick={() => handleClick(movie)}`: Calls `handleClick` when the poster is clicked.
 *       - `className={...isLargeRow ? "row__posterLarge" : ""}`: Applies a special class for larger posters if `isLargeRow` is true.
 *       - `src={...}`: Constructs the image URL using `base_url` and either `poster_path` or `backdrop_path` from the movie data.
 *       - `alt={...}`: Provides alternative text for the image.
 * - `{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}`:
 *   - This is conditional rendering. The `<YouTube ... />` component is only rendered if `trailerUrl` has a value (i.e., a trailer ID is set).
 *   - `videoId={trailerUrl}`: Passes the trailer ID to the YouTube player.
 *
 * --- Export ---
 * - `export default Row;`: Makes the `Row` component available for use in other parts of the application.
 */
