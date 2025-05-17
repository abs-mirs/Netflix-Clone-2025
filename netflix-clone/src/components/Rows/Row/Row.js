// --- Imports: Bringing in necessary tools ---
import React, { useEffect, useState } from "react"; // Core React library and specific functions (Hooks)
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer"; // Library to find movie trailer URLs
import YouTube from "react-youtube"; // Component to embed YouTube videos

// --- Component Definition: Creating the 'Row' ---
// This is a function that defines what a "Row" of movies looks like and how it behaves.
// It accepts 'props' (properties) like title, fetchUrl, and isLargeRow from its parent.
const Row = ({ title, fetchUrl, isLargeRow }) => {
  // --- State Variables: Managing data that can change ---
  // 'useState' is a React Hook to add state to function components.
  const [movies, setMovie] = useState([]); // 'movies': an array to store the list of movies. Starts empty.
  // 'setMovie': a function to update the 'movies' list.
  const [trailerUrl, setTrailerUrl] = useState(""); // 'trailerUrl': a string for the YouTube video ID. Starts empty (no trailer).
  // 'setTrailerUrl': a function to update the 'trailerUrl'.

  // --- Constants: Values that don't change ---
  const base_url = "https://image.tmdb.org/t/p/original"; // Base part of the URL for movie poster images.

  // --- useEffect Hook: Handling side effects (like fetching data) ---
  // This code runs after the component is first rendered and whenever 'fetchUrl' changes.
  useEffect(() => {
    // Defines an 'async' function (can use 'await') to fetch data.
    (async () => {
      try {
        // Tries to run this code
        // 'await' pauses execution until 'axios.get(fetchUrl)' completes (gets data from the API).
        const request = await axios.get(fetchUrl);
        // Updates the 'movies' state with the 'results' array from the API response.
        setMovie(request.data.results);
      } catch (error) {
        // If an error happens in the 'try' block
        console.log("error", error); // Logs the error to the console.
      }
    })(); // Immediately calls the async function defined above.
  }, [fetchUrl]); // The '[fetchUrl]' tells React to re-run this effect only if 'fetchUrl' changes.

  // --- handleClick Function: What happens when a poster is clicked ---
  const handleClick = (movie) => {
    // Takes the clicked 'movie' object as an argument.
    if (trailerUrl) {
      // If a trailer is already playing (trailerUrl has a value)
      setTrailerUrl(""); // Clear trailerUrl to close the current trailer.
    } else {
      // If no trailer is playing
      // Tries to find a trailer for the movie using its title or name.
      // 'movie?.title' uses optional chaining: if 'movie' is null/undefined, it won't error.
      // '|| ""' provides an empty string if all title/name properties are missing.
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          // If 'movieTrailer' successfully finds a URL
          if (url) {
            // Checks if a URL was actually returned
            console.log(url); // Logs the full YouTube URL.
            // 'URLSearchParams' helps extract parts of a URL.
            const urlParams = new URLSearchParams(new URL(url).search);
            console.log(urlParams); // Logs the URL parameters object.
            console.log(urlParams.get("v")); // Logs the value of the 'v' parameter (the video ID).
            // Sets the 'trailerUrl' state to the extracted video ID.
            setTrailerUrl(urlParams.get("v"));
          } else {
            // If 'movieTrailer' couldn't find a URL
            console.log(`Trailer not found for ${movie?.name || movie?.title}`);
          }
        })
        .catch((error) => {
          // If 'movieTrailer' itself has an error (e.g., network issue)
          console.error("Error fetching trailer:", error);
        });
    }
  };

  // --- opts Object: Configuration for the YouTube player ---
  const opts = {
    height: "390", // Player height in pixels.
    width: "100%", // Player width (100% of its container).
    playerVars: {
      // Additional player parameters.
      autoplay: 1, // '1' means autoplay the video when it loads.
    },
  };

  // --- return Statement: What the component renders (JSX) ---
  // This is the HTML-like structure that will be displayed on the screen.
  return (
    <div className="row">
      {" "}
      {/* Main container for the row */}
      <h1>{title}</h1> {/* Displays the row's title (passed as a prop) */}
      <div className="row__posters">
        {" "}
        {/* Container for all the movie posters */}
        {/*
                  'movies?.map(...)': If 'movies' exists, loop through each 'movie' object in the array.
                  For each movie, it creates an <img> element.
                  'index' is the position of the movie in the array.
                */}
        {movies?.map((movie, index) => (
          <img
            // '() => handleClick(movie)': When clicked, call 'handleClick' with this specific movie.
            onClick={() => handleClick(movie)}
            // 'key': A unique identifier for React to efficiently update list items.
            // Prefers 'movie.id' if available, otherwise uses the array 'index'.
            key={movie.id || index}
            // 'src': The image source URL.
            // It combines 'base_url' with either 'poster_path' or 'backdrop_path'.
            // If 'isLargeRow' is true and 'movie.poster_path' exists, use 'poster_path'.
            // Otherwise, use 'backdrop_path', or 'poster_path' as a fallback.
            src={`${base_url}${
              isLargeRow && movie.poster_path
                ? movie.poster_path
                : movie.backdrop_path || movie.poster_path
            }`}
            // 'alt': Alternative text for the image (for accessibility and if image fails to load).
            // Tries 'movie.name', then 'movie.title', then 'movie.original_name'.
            alt={movie.name || movie.title || movie.original_name}
            // 'className': CSS classes for styling.
            // Always has 'row__poster'. If 'isLargeRow' is true, also adds 'row__posterLarge'.
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          />
        ))}
      </div>
      {/* Container for the YouTube player, with 40px padding */}
      <div style={{ padding: "40px" }}>
        {/*
                  Conditional Rendering:
                  'trailerUrl && ...': If 'trailerUrl' has a value (is not empty),
                  then render the '<YouTube ... />' component. Otherwise, render nothing here.
                */}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

// --- Export: Making the component available for use in other files ---
export default Row;
