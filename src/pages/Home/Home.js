import React, { useContext } from "react";
import classes from "./Home.module.css";
import AuthContext from "../../context/Authentication";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

function Home() {
  const { auth, lastLogins } = useContext(AuthContext);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {auth && (
          <div className={classes.withLogin}>
            <div>
              <h2>Welcome {lastLogins?.firstName}!</h2>
              <h3>(@{lastLogins?.nickName})</h3>
            </div>
            <h3>Wish you are having a nice day 😎</h3>
          </div>
        )}
        {!auth && (
          <div className={classes.withoutLogin}>
            <h2>Welcome to Explore Hub</h2>
            <div className={classes.signupLink}>
              <Link to="/signup">
                <LoginIcon />
                Join the Community of Adventurers
              </Link>
            </div>
            <p>
              <span className={classes.firstSentence}>Explore Hub</span> is the
              place where you can share your travel experiences, discover hidden
              gems, and connect with fellow adventurers. Don't have an account?
              Create one now to start sharing your incredible journeys with the
              world.
            </p>
            <br />
            <p>
              <span className={classes.firstSentence}>If you're</span> already a
              part of our community, welcome back! Start sharing your latest
              travel stories, photos, and tips with us.
            </p>
            <small className={classes.developer}>
              Developed by Kaan Yardımcı
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
