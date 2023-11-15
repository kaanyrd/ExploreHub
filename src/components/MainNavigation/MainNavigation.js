import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
// import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AuthContext from "../../context/Authentication";
import SearchingContext from "../../context/Searching.js";

function MainNavigation() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { setSearching } = useContext(SearchingContext);
  const [input, setInput] = useState("");

  const onInputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearching(input.toLowerCase());
    setInput("");
    navigate("/places");
  };

  const dispatch = useDispatch();
  const [user, setNewUser] = useState(null);
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
        const response = await fetch(`https://retoolapi.dev/Brjzmm/users`);
        const resData = await response.json();
        const userSelf = resData.find((user) => user.token.toString() === auth);
        setNewUser(userSelf);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [auth]);

  return (
    <div className={classes.navbar}>
      {navigationBar && (
        <div className={classes.inputSide}>
          <ArrowBackIosIcon
            onClick={closeInputBar}
            fontSize="large"
            className={classes.backTo}
          />
          <form onSubmit={onSubmitHandler} className={classes.formSide}>
            <input
              value={input}
              onChange={onInputChangeHandler}
              type="text"
              placeholder="Search any post or user..."
            />
            <button className={classes.formSubmitButton} type="submit">
              <SearchIcon />
            </button>
            {/* <button className={classes.voiceButton}>
              <KeyboardVoiceIcon />
            </button> */}
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
              <Link to="/places" end="true">
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
            <form onSubmit={onSubmitHandler} className={classes.bigScreenForm}>
              <input
                value={input}
                onChange={onInputChangeHandler}
                type="text"
                placeholder="Search any post or user..."
              />
              <button type="submit">
                <SearchIcon />
              </button>
              {/* <button>
                <KeyboardVoiceIcon />
              </button> */}
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
                  {user?.firstName[0].toUpperCase()}
                  {user?.lastName[0].toUpperCase()}
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
