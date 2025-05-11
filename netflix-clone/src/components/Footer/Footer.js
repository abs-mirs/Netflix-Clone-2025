import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div className="footer_outer_container">
      <div className="footer_inner_container">
        <div className="footer_icons">
          <FacebookOutlinedIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </div>
        <div className="footer_data">
          <div>
            {" "}
            {/* Column 1 */}
            <ul>
              <li>Audio Description</li>
              <li>Investor Relations</li>
              <li>Legal Notice</li>
            </ul>
          </div>
          <div>
            {" "}
            {/* Column 2 */}
            <ul>
              <li>Help Center</li>
              <li>Jobs</li>
              <li>Cookie Preferences</li>
            </ul>
          </div>
          <div>
            {" "}
            {/* Column 3 */}
            <ul>
              <li>Gift Cards</li>
              <li>Terms of Use</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          <div>
            {" "}
            {/* Column 4 */}
            <ul>
              <li>Media Center</li>
              <li>Privacy</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>{" "}
        {/* End of footer_data */}
        <div className="service_code">
          <p>Service Code</p>
        </div>
        <div className="copy-write">© 1997-2024 Netflix, Inc.</div>
      </div>{" "}
      {/* End of footer_inner_container */}
    </div> /* End of footer_outer_container */
  );
};

export default Footer;
