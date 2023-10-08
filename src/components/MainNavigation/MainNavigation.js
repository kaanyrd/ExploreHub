import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/icons/logo1.png";
import classes from "./MainNavigation.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function MainNavigation() {
  return (
    <div>
      <div className={classes.menuIcon}>
        <MenuIcon />
      </div>
      <div className={classes.logoSide}>
        <Link to="/">
          <img src={icon} className={classes.logoSelf} alt="icon" />
        </Link>
      </div>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/places" end>
            Places
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/favs" end>
            <FavoriteBorderIcon />
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/myprofile" end>
            Profile
          </NavLink>
        </li> */}
        <div className="login-signupButton">
          <li>
            <NavLink to="/login" end>
              Login
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default MainNavigation;
