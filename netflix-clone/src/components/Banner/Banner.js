import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // Note: Adjusted path based on typical convention, original was ../../utils/axios
import requests from "../../utils/requests"; // Note: Adjusted path based on typical convention, original was ../../utils/requests
import "./Banner.css";

function Banner() {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    async function BannerData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        console.log(response);
        setBanner(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ]
        );
      } catch (err) {
        console.log(err);
      }
    }
    BannerData();
  }, []);
  console.log(banner);
  function truncate(str, n) {
    return str?.length > n ? str.slice(0, n - 1) + "...." : str;
  }
  return (
    <div className="banner_container">
      <div
        className="banner_img"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${
            banner?.backdrop_path || banner?.poster_path
          }")`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner_contents">
          <h1>{banner?.title || banner?.name || banner?.original_name}</h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>

          <p className="banner_description">
            {truncate(banner?.overview, 150)}
          </p>
        </div>
        <div className="banner_fadebotom"></div>
      </div>
    </div>
  );
}

export default Banner;


