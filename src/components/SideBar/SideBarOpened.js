import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { sideBarAction } from "../../store/sidebar-slice";
import classes from "./SideBarOpened.module.css";
import CloseIcon from "@mui/icons-material/Close";
import icon from "../../assets/icons/logo2.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PersonIcon from "@mui/icons-material/Person";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { login } from "../../util/Authentication";

function SideBarOpened() {
  const dispatch = useDispatch();

  const closeSideHandler = () => {
    dispatch(sideBarAction.closeSide());
  };

  const Auth = login;

  return (
    <div className={classes.side}>
      <div className={classes.closeBtn} onClick={closeSideHandler}>
        <CloseIcon />
      </div>
      <div className={classes.sideContent}>
        <div className={classes.sideFooter}>
          <h2 className={classes.title}>Explore Hub</h2>
          <div className={classes.divider}></div>
          <div className={classes.iconSide}>
            <img className={classes.iconSelf} src={icon} alt="icon" />
          </div>

          {!Auth && (
            <div>
              {/* FIXME LINKLER AUTH A GÖRE DEĞİŞECEK */}
              <ul className={classes.generalLinks}>
                <NavLink
                  onClick={closeSideHandler}
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.nonActive
                  }
                >
                  <HomeIcon fontSize="large" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  onClick={closeSideHandler}
                  to="/places"
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.nonActive
                  }
                >
                  <InsertPhotoIcon fontSize="large" />
                  <span>All Places</span>
                </NavLink>
              </ul>
              <div className={classes.linkControl}>
                <p className={classes.info}>You have an account?</p>
                <Link
                  className={classes.navLink}
                  onClick={closeSideHandler}
                  to={"/login"}
                >
                  Login
                </Link>
              </div>
              <div className={classes.linkControl}>
                <p className={classes.info}>You don't have an account?</p>
                <Link
                  className={classes.navLink}
                  onClick={closeSideHandler}
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
          {Auth && (
            <div>
              {/* FIXME LINKLER AUTH A GÖRE DEĞİŞECEK */}
              <ul className={classes.generalLinks}>
                <NavLink
                  onClick={closeSideHandler}
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.nonActive
                  }
                >
                  <HomeIcon fontSize="large" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  onClick={closeSideHandler}
                  to="/places"
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.nonActive
                  }
                >
                  <InsertPhotoIcon fontSize="large" />
                  <span>All Places</span>
                </NavLink>
                <NavLink
                  onClick={closeSideHandler}
                  to="/myprofile"
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.nonActive
                  }
                >
                  <PersonIcon />
                  <span>My Profile</span>
                </NavLink>
                <NavLink
                  onClick={closeSideHandler}
                  to="/photogallery"
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.nonActive
                  }
                >
                  <PhotoLibraryIcon fontSize="large" />
                  <span>Photo Gallery</span>
                </NavLink>
              </ul>
              {!Auth && (
                <div>
                  <div className={classes.linkControl}>
                    <p className={classes.info}>You have an account?</p>
                    <Link
                      className={classes.navLink}
                      onClick={closeSideHandler}
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </div>
                  <div className={classes.linkControl}>
                    <p className={classes.info}>You don't have an account?</p>
                    <Link
                      className={classes.navLink}
                      onClick={closeSideHandler}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          <h4 className={classes.developer}>Developed by Kaan Yardımcı</h4>
          <div className={classes.bottomSide}>
            <h3 className={classes.socialsTitle}>My Socials</h3>
            <div className={classes.socials}>
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
