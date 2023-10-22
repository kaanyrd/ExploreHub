import React from "react";
import classes from "./LeftSideBar.module.css";
import logo from "../../assets/icons/icon10.png";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PanoramaIcon from "@mui/icons-material/Panorama";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { login } from "../../util/Authentication";

function LeftSideBar() {
  const date = new Date();
  const year = date.getFullYear();

  // FIXME AS TOKEN

  const Auth = login;

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <img src={logo} alt="logo" className={classes.logo} />
        {Auth && (
          <div>
            <ul className={classes.links}>
              <li className={classes.link}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.nonActive
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
                    isActive ? classes.active : classes.nonActive
                  }
                >
                  <PanoramaIcon />
                  All Places
                </NavLink>
              </li>
              <li className={classes.link}>
                <NavLink
                  to="/photogallery"
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.nonActive
                  }
                >
                  <PhotoLibraryIcon />
                  Photo Gallery
                </NavLink>
              </li>
            </ul>
            <div className={classes.divider}></div>
            <ul className={classes.links}>
              <li className={classes.link}>
                <NavLink
                  to="/myprofile"
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.nonActive
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
                    isActive ? classes.active : classes.nonActive
                  }
                >
                  <AddAPhotoIcon />
                  New Post
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {!Auth && (
          <div>
            <ul className={classes.links}>
              <li className={classes.link}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.nonActive
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
                    isActive ? classes.active : classes.nonActive
                  }
                >
                  <PanoramaIcon />
                  All Places
                </NavLink>
              </li>
            </ul>
            <div className={classes.divider}></div>
            <div className={classes.infoAboutSite}>
              <h5>To share, you have to login</h5>
              <Link className={classes.loginButton} to="/login">
                <span>Login</span>
                <PersonIcon />
              </Link>
            </div>
          </div>
        )}
        <div className={classes.divider}></div>
        <div className={classes.developer}>
          <p>Developed by</p>
          <p>
            <strong>Kaan Yardımcı</strong>
          </p>
          <p>
            <small>&copy; {year}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
