// --- Imports: Bringing in necessary tools ---
import React, { useEffect, useState } from "react"; // Core React library and specific functions (Hooks)
import axios from "../../utils/axios"; // Library for making API calls (likely a pre-configured version)
import requests from "../../utils/requests"; // File containing predefined API request URLs
import "./Banner.css"; // Stylesheet for this Banner component

// --- Component Definition: Creating the 'Banner' ---
// This function defines what the main banner at the top of the page looks like and how it behaves.
function Banner() {
  // --- State Variable: Managing data for the banner ---
  // 'useState' is a React Hook to add state.
  const [banner, setBanner] = useState([]); // 'banner': an object to store data for a single, randomly selected movie/show.
  // Starts as an empty array (though ideally an empty object or null for a single item).
  // 'setBanner': a function to update the 'banner' data.

  // --- useEffect Hook: Handling side effects (like fetching initial banner data) ---
  // This code runs once after the component is first rendered because the dependency array `[]` is empty.
  useEffect(() => {
    // Defines an 'async' function (can use 'await') to fetch banner data.
    async function BannerData() {
      try {
        // Tries to run this code
        // 'await' pauses execution until 'axios.get' completes (gets data for Netflix Originals).
        const response = await axios.get(requests.fetchNetflixOriginals);
        console.log(response); // Logs the entire API response.
        // Updates the 'banner' state with a single, randomly selected item from the 'results' array.
        setBanner(
          response.data.results[ // Accesses the array of movies/shows
            Math.floor(Math.random() * response.data.results.length) // Generates a random index within the array's length
          ]
        );
      } catch (err) {
        // If an error happens in the 'try' block
        console.log(err); // Logs the error to the console.
      }
    }
    BannerData(); // Immediately calls the async function defined above.
  }, []); // The empty '[]' means this effect runs only once after the initial render.

  console.log(banner); // Logs the current 'banner' state object (useful for debugging).

  // --- truncate Function: Utility to shorten a string ---
  // Takes a string 'str' and a maximum length 'n'.
  function truncate(str, n) {
    // 'str?.length': Optional chaining - if 'str' is null/undefined, it won't cause an error.
    // If the string's length is greater than 'n',
    // it slices the string from the beginning up to 'n-1' characters and adds "....".
    // Otherwise, it returns the original string.
    return str?.length > n ? str.slice(0, n - 1) + "...." : str;
  }

  // --- return Statement: What the component renders (JSX) ---
  // This is the HTML-like structure that will be displayed on the screen.
  return (
    <div className="banner_container">
      {" "}
      {/* Outermost container for the banner area */}
      <div
        className="banner_img" // Div that will have the background image
        style={{
          // Inline styles are applied directly to this div
          backgroundSize: "cover", // Scales the background image to cover the entire container.
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${
            // Sets the background image URL.
            // Uses optional chaining and a fallback:
            // Tries to use 'banner?.backdrop_path', if not available, tries 'banner?.poster_path'.
            banner?.backdrop_path || banner?.poster_path
          }")`,
          backgroundPosition: "center center", // Centers the background image.
          backgroundRepeat: "no-repeat", // Prevents the background image from repeating.
        }}
      >
        <div className="banner_contents">
          {" "}
          {/* Container for the text content and buttons on the banner */}
          {/* Displays the title of the banner item.
              Uses optional chaining and fallbacks: tries 'banner.title', then 'banner.name', then 'banner.original_name'. */}
          <h1>{banner?.title || banner?.name || banner?.original_name}</h1>
          <div className="banner_buttons">
            {" "}
            {/* Container for the action buttons */}
            <button className="banner_button">Play</button> {/* Play button */}
            <button className="banner_button">My List</button>{" "}
            {/* My List button */}
          </div>
          {/* Displays the description/overview of the banner item.
              Calls the 'truncate' function to shorten the 'banner.overview' to 150 characters if it's longer. */}
          <p className="banner_description">
            {truncate(banner?.overview, 150)}
          </p>
        </div>
        <div className="banner_fadebotom"></div>{" "}
        {/* An empty div, likely styled with CSS to create a fade effect at the bottom of the banner. */}
      </div>
    </div>
  );
}

// --- Export: Making the component available for use in other files ---
export default Banner;
