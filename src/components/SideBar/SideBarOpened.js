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
        <div className={classes.sideFooter}>
          <h2 className={classes.title}>Explore Hub</h2>
          <div className={classes.divider}></div>
          <div className={classes.iconSide}>
            <img className={classes.iconSelf} src={icon} alt="icon" />
          </div>

          <div>
            {/* FIXME LINKLER AUTH A GÖRE DEĞİŞECEK */}
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
                Sign-up
              </Link>
            </div>
          </div>
          <h4 className={classes.developer}>Developed by Kaan Yardımcı</h4>
          <div className={classes.bottomSide}>
            <h3 className={classes.socialsTitle}>My Socails</h3>
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
