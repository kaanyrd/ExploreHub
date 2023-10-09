import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/icons/logo2.png";
import classes from "./MainNavigation.module.css";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch } from "react-redux";
import { sideBarAction } from "../../store/sidebar-slice";

function MainNavigation() {
  const dispatch = useDispatch();

  const openSideHandler = () => {
    dispatch(sideBarAction.openSide());
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContent}>
        <div className={classes.contentLeft}>
          <div onClick={openSideHandler} className={classes.menuIcon}>
            <MenuIcon />
          </div>
          <div className={classes.logoSide}>
            <Link to="/">
              <img src={icon} className={classes.logoSelf} alt="icon" />
            </Link>
          </div>
        </div>
        <ul className={classes.contentRight}>
          {/* <li>
            <NavLink to="/favs" end>
              <FavoriteBorderIcon />
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/places" end>
              Places
            </NavLink>
          </li>
          <li className={classes.logoutBtn}>
            <NavLink to="/login" end>
              <LoginIcon />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainNavigation;
