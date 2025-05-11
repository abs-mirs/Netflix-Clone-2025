import React from "react";
// import NetflixLogo.jpg from "../../assets/images/NetflixLogo"
import "./header.css"
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import netflix_rep from "../../assets/images/netflix_rep.svg"



const Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header_container">
        <div className="header_left">
          <ul>
            <li>
                <img src={netflix_rep} alt="Netflix Logo" width="100" />
              </li>
            <li>Netflix</li>
            <li>Home</li>
            <li>TVShows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>MyList</li>
            <li>Browse by Languages</li>
          </ul>
        </div>
        <div className="header_right">
          <ul>
            <li>
              <SearchIcon />
            </li>
            <li>
              <NotificationsIcon />
            </li>
            <li>
                <AccountBoxIcon />
              </li>
              <li>
                <ArrowDropDownIcon />
              </li> 
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
