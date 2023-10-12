import React from "react";
import classes from "./Footer.module.css";
import logo from "../../assets/icons/icon10.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.footerRightSide}>
          <img src={logo} className={classes.logoSelf} alt="logo" />

          <div className={classes.links}>
            <h4>Developed by Kaan Yardımcı</h4>
            <ul className={classes.socials}>
              <a
                className={classes.link}
                href="https://twitter.com/Kaanyrd1"
                target="blank"
              >
                <TwitterIcon />
              </a>
              <a
                className={classes.link}
                href="https://github.com/kaanyrd"
                target="blank"
              >
                <GitHubIcon />
              </a>
              <a
                className={classes.link}
                href="mailto:kaan.yardimci@yahoo.com.tr?subject=Hello Kaan%20!"
                target="blank"
              >
                <EmailIcon />
              </a>

              <a
                className={classes.link}
                href="https://www.linkedin.com/in/kaanyardimci/"
                target="blank"
              >
                <LinkedInIcon />
              </a>
              <a
                className={classes.link}
                href="https://www.instagram.com/kaanyrd/"
                target="blank"
              >
                <InstagramIcon />
              </a>
            </ul>
          </div>
        </div>
        <div className={classes.divider}></div>
        <div>
          <h4>All rights reserved</h4>
          <h6 className={classes.copyright}> &copy; {year}</h6>
        </div>
      </div>
    </div>
  );
}

export default Footer;
