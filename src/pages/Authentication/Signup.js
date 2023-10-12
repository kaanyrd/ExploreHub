import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";
import logo from "../../assets/icons/logo2.png";

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
    } else if (
      password !== password2 &&
      password.length !== 0 &&
      password2.length !== 0
    ) {
      setConfirmPassword(false);
    }
  }, [password, password2]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.contentLeft}>
          <div className={classes.leftTopSide}>
            <img className={classes.logoSelf} src={logo} alt="logo" />
            <h2>Explore Hub</h2>
          </div>
          <p className={classes.infoText}>
            <small>Create your account and start to share!</small>
          </p>
        </div>
        <div className={classes.contentRight}>
          <div className={classes.cardTop}>
            <h3 className={classes.signupTitle}>Signup</h3>
          </div>
          <form>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input placeholder="Firstname" type="text" />
              </div>
              <div className={classes.formControl}>
                <input placeholder="Lastname" type="text" />
              </div>
            </div>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input placeholder="E-mail" type="email" />
              </div>
              <div className={classes.formControl}>
                <input placeholder="Nickname" type="text" />
              </div>
            </div>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input
                  onChange={passwordChangeHandler}
                  value={password}
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div className={classes.formControl}>
                <div
                  className={`${classes.formControl} ${
                    confirmPassword ? classes.confirmed : classes.notConfirmed
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
            </div>
            <div className={classes.formControl}>
              <small>Date of birth*</small>
              <input type="date" />
            </div>
            <div className={classes.signBtn}>
              <button>Signup</button>
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
    </div>
  );
}

export default Signup;
