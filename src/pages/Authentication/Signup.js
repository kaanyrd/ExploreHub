import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";

function Signup() {
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const password2ChangeHandler = (e) => {
    setPassword2(e.target.value);
  };

  useEffect(() => {
    if (
      password === password2 &&
      password.length !== 0 &&
      password2.length !== 0
    ) {
      setConfirmPassword(true);
    } else {
      setConfirmPassword(false);
    }
  }, [password, password2]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <form>
          <div className={classes.formControl}>
            <input placeholder="Firstname" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="Lastname" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="Nickname" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="E-mail" type="email" />
          </div>
          <div className={classes.formControl}>
            <input
              onChange={passwordChangeHandler}
              value={password}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className={classes.formControl}>
            {/* {confirmPassword && (
            <p style={{ color: "green" }}>Password Confirmed...</p>
          )} */}
            <div
              className={`${classes.formControl} ${
                confirmPassword ? classes.confirmed : undefined
              }`}
            >
              <input
                onChange={password2ChangeHandler}
                value={password2}
                placeholder="Confirm Password"
                type="password"
              />
            </div>
          </div>
          <div className={classes.formControl}>
            <small>Date of birth*</small>
            <input type="date" />
          </div>
          <div className={classes.signBtn}>
            <button>Sign up</button>
          </div>
        </form>
        <div className={classes.divider}></div>
        <div className={classes.otherLink}>
          <Link className={classes.changeLink} to="/login">
            You have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
