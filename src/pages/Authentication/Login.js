import React from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
// import logo from "../../assets/icons/icon10.png";

function Login() {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.formSide}>
          <form className={classes.form}>
            <div>
              <input placeholder="Email adress or nickname" type="email" />
            </div>
            <div>
              <input placeholder="Password" type="password" />
            </div>
            <div className={classes.loginBtn}>
              <button>Login</button>
            </div>
          </form>
          <div className={classes.otherLinks}>
            <Link className={classes.changeLink} to="/changepassword">
              Forgot your password?
            </Link>
            <div className={classes.divider}></div>
            <Link className={classes.signupLink} to="/signup">
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
