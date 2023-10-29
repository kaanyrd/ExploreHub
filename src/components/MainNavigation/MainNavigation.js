import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/icons/logo2.png";
import classes from "./MainNavigation.module.css";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { sideBarAction } from "../../store/sidebar-slice";
import { ProfileAction } from "../../store/profileInfo-slice";
import ProfileInfo from "./ProfileInfo.js";
import SearchIcon from "@mui/icons-material/Search";
import { NavigationAction } from "../../store/navigation-slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AuthContext from "../../context/Authentication";

function MainNavigation() {
  const [user, setUser] = useState(null);
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const profileBar = useSelector((state) => state.profileSide.toggle);
  const navigationBar = useSelector((state) => state.navigationSlice.toggle);

  const openSideHandler = () => {
    dispatch(sideBarAction.openSide());
  };

  const openProfileSide = () => {
    dispatch(ProfileAction.openProfile());
  };

  const closeProfileSide = () => {
    dispatch(ProfileAction.closeProfile());
  };

  const openInputBar = () => {
    dispatch(NavigationAction.openToggle());
  };

  const closeInputBar = () => {
    dispatch(NavigationAction.closeToggle());
  };

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await fetch(
          `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json`
        );

        const resData = await response.json();
        let dataArr = [];
        for (let key in resData) {
          dataArr.push({
            id: key.toString(),
            ...resData[key],
          });
        }
        let userSelf = dataArr.find((user) => user.token.toString() === auth);
        setUser(userSelf);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [auth]);

  return (
    <div className={classes.navbar}>
      {/* FIXME LOADER BORDER */}
      {navigationBar && (
        <div className={classes.inputSide}>
          <ArrowBackIosIcon
            onClick={closeInputBar}
            fontSize="large"
            className={classes.backTo}
          />
          <form className={classes.formSide}>
            <input type="text" placeholder="Search any post..." />
            <button className={classes.formSubmitButton} type="submit">
              <SearchIcon />
            </button>
            <button className={classes.voiceButton}>
              <KeyboardVoiceIcon />
            </button>
          </form>
        </div>
      )}
      {!navigationBar && (
        <div className={classes.navbarContent}>
          <div className={classes.contentLeft}>
            <div className={classes.logos}>
              <div onClick={openSideHandler} className={classes.menuIcon}>
                <MenuIcon />
              </div>
              <Link to="/" end>
                <img src={icon} className={classes.logoSelf} alt="icon" />
              </Link>
            </div>

            <SearchIcon
              onClick={openInputBar}
              fontSize="large"
              className={classes.searchButton}
            />
          </div>
          <div>
            <form className={classes.bigScreenForm}>
              <input type="text" placeholder="Search any post..." />
              <button type="submit">
                <SearchIcon />
              </button>
              <button>
                <KeyboardVoiceIcon />
              </button>
            </form>
          </div>
          {!auth && (
            <ul className={classes.contentRight}>
              <li className={classes.logoutBtn}>
                <NavLink to="/login" end>
                  <LoginIcon />
                </NavLink>
              </li>
            </ul>
          )}
          {auth && (
            <div className={classes.rightSide}>
              <li>
                <NavLink to="/bookmarks" end>
                  <BookmarksIcon />
                </NavLink>
              </li>
              <div className={classes.profileSide}>
                <h4 onClick={openProfileSide}>
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </h4>
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
      )}
    </div>
  );
}

export default MainNavigation;
