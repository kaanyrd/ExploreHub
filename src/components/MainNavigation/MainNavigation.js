import React from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/icons/logo2.png";
import bigIcon from "../../assets/icons/icon10.png";
import classes from "./MainNavigation.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { sideBarAction } from "../../store/sidebar-slice";
import { ProfileAction } from "../../store/profileInfo-slice";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

function MainNavigation() {
  const dispatch = useDispatch();
  const profileBar = useSelector((state) => state.profileSide.toggle);

  const openSideHandler = () => {
    dispatch(sideBarAction.openSide());
  };

  const openProfileSide = () => {
    dispatch(ProfileAction.openProfile());
  };

  const closeProfileSide = () => {
    dispatch(ProfileAction.closeProfile());
  };

  const login = true;

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContent}>
        <div className={classes.contentLeft}>
          <div onClick={openSideHandler} className={classes.menuIcon}>
            <MenuIcon />
          </div>
          {/* <div className={classes.logoSide}> */}
          <Link to="/" end>
            <img src={icon} className={classes.logoSelf} alt="icon" />
            <img src={bigIcon} className={classes.bigIcon} alt="icon" />
          </Link>
          {/* </div> */}
        </div>
        {!login && (
          <ul className={classes.contentRight}>
            <li className={classes.logoutBtn}>
              <NavLink to="/login" end>
                <LoginIcon />
              </NavLink>
            </li>
          </ul>
        )}
        {login && (
          <div className={classes.rightSide}>
            <li>
              <NavLink to="/favs" end>
                <FavoriteBorderIcon />
              </NavLink>
            </li>
            <div className={classes.profileSide}>
              <h4 onClick={openProfileSide}>MI</h4>
              {profileBar &&
                ReactDOM.createPortal(
                  <div
                    onClick={closeProfileSide}
                    className={classes.background}
                  ></div>,
                  document.getElementById("background")
                )}
              {profileBar &&
                ReactDOM.createPortal(
                  <div className={classes.profileSection}>
                    <ProfileInfo />
                  </div>,
                  document.getElementById("profileinfo")
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainNavigation;
