import React from "react";
import { Link } from "react-router-dom";
import classes from "./ChangePassword.module.css";
import logo from "../../assets/icons/logo2.png";

function ChangePassword() {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.infoSide}>
          <div className={classes.informationHeaders}>
            <img className={classes.logoSelf} src={logo} alt="logo" />
            <div className={classes.infoHeader}>
              <h2>Change Password</h2>
              <h3>Step 1/2</h3>
            </div>
          </div>
          <p className={classes.infoText}>
            Please enter your email adress or nickname to continue...
          </p>
        </div>
        <div className={classes.formSide}>
          <h3 className={classes.formTitle}>Enter your E-mail or Nickname</h3>
          <form>
            <div className={classes.formController}>
              <input placeholder="example@test.com" type="email" />
            </div>
            <div className={classes.submitBtn}>
              <button>Continue</button>
            </div>
          </form>
          <div className={classes.otherLink}>
            <Link className={classes.changeLink} to="/signup">
              Signup
            </Link>
            <span className={classes.dot}>or</span>
            <Link className={classes.changeLink} to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
