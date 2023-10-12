import React from "react";
import { Link } from "react-router-dom";
import classes from "./ChangePassword.module.css";

function ChangePassword() {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <form>
          <div className={classes.formController}>
            <input placeholder="E-mail or Nickname" type="email" />
          </div>
          <div className={classes.submitBtn}>
            <button>Continue</button>
          </div>
        </form>
        <div className={classes.otherLink}>
          <Link className={classes.changeLink} to="/signup">
            Sign up
          </Link>
          <span className={classes.dot}>•</span>
          <Link className={classes.changeLink} to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
