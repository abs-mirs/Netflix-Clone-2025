import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // Note: Adjusted path based on typical convention, original was ../../utils/axios
import requests from "../../utils/requests"; // Note: Adjusted path based on typical convention, original was ../../utils/requests
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({}); // Initialize with empty object

  useEffect(() => {
    async function fetchData() {
      // Define async function inside useEffect
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request); // Log the full response
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to truncate strings (likely needed for commented out code)
  // function truncate(str, n) {
  //     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  // }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
};

export default Banner;

// Key points captured:
// Imports: React, hooks, axios, requests.
// Component: Banner functional component.
// State: movie state initialized as an empty object.
// useEffect: Fetches data using axios and requests.fetchNetflixOriginals on component mount.
// Random Movie Selection: Selects a random movie from the results and sets it to the movie state.
// Error Handling: Basic try...catch block for the API call.
// JSX Structure:
// Outer div with className="banner" and dynamic background image styling based on movie.backdrop_path.
// Inner div with className="banner__contents".
// h1 for the title, using optional chaining and OR operators (||) to handle potential missing title variations (title, name, original_name).
// div for buttons (Play, My List).
// Commented-out h1 for the description, which intended to use a truncate function (which is not defined in the provided screenshots but often used in such components).
// Empty div with className="banner__fadeBottom" likely for a CSS gradient effect.
// Export: export default Banner.
