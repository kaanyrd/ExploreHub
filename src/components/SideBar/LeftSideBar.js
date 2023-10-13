import React from "react";
import classes from "./LeftSideBar.module.css";
import logo from "../../assets/icons/icon10.png";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PanoramaIcon from "@mui/icons-material/Panorama";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";

function LeftSideBar() {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <img src={logo} alt="logo" className={classes.logo} />

        <ul className={classes.links}>
          <li className={classes.link}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <HomeIcon />
              Home
            </NavLink>
          </li>
          <li className={classes.link}>
            <NavLink
              to="/places"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <PanoramaIcon />
              All Places
            </NavLink>
          </li>
          <li className={classes.link}>
            <NavLink
              to="/favs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <BookmarksIcon />
              Bookmarks
            </NavLink>
          </li>
          <div className={classes.divider}></div>
          <li className={classes.link}>
            <NavLink
              to="/myprofile"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <PersonIcon />
              My Profile
            </NavLink>
          </li>
          <li className={classes.link}>
            <NavLink
              to="/addplace"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <AddAPhotoIcon />
              New Post
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSideBar;
