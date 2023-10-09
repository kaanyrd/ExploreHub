import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sideBarAction } from "../../store/sidebar-slice";
import classes from "./SideBarOpened.module.css";
import CloseIcon from "@mui/icons-material/Close";
import icon from "../../assets/icons/logo2.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

function SideBarOpened() {
  const dispatch = useDispatch();

  const closeSideHandler = () => {
    dispatch(sideBarAction.closeSide());
  };

  return (
    <div className={classes.side}>
      <div className={classes.closeBtn} onClick={closeSideHandler}>
        <CloseIcon />
      </div>
      <div className={classes.sideContent}>
        <ul>
          <li onClick={closeSideHandler}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={closeSideHandler}>
            <Link to="/places">Places</Link>
          </li>
          <li onClick={closeSideHandler}>
            <p>
              You don't have an account? <Link to="/signup">Sign-up</Link>
            </p>
          </li>
        </ul>
        <div className={classes.sideFooter}>
          <h2>Explore Hub</h2>
          <div className={classes.iconSide}>
            <img className={classes.iconSelf} src={icon} alt="icon" />
          </div>
          <small>Developed by Kaan YARDIMCI</small>
          <div>
            <h2>Socails</h2>
            <div>
              <a href="https://twitter.com/Kaanyrd1" target="blank">
                <TwitterIcon />
              </a>
              <a href="https://github.com/kaanyrd" target="blank">
                <GitHubIcon />
              </a>
              <a
                href="mailto:kaan.yardimci@yahoo.com.tr?subject=Hello Kaan%20!"
                target="blank"
              >
                <EmailIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/kaanyardimci/"
                target="blank"
              >
                <LinkedInIcon />
              </a>
              <a href="https://www.instagram.com/kaanyrd/" target="blank">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarOpened;
