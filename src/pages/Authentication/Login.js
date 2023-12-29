import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import logo from "../../assets/icons/logo2.png";
import AuthContext from "../../context/Authentication";
import InvalidLogin from "../../components/InvalidLogin/InvalidLogin";
import avatar from "../../assets/casualPhotos/avatar5.jpeg";

function Login() {
  const auth = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const { setAuth, lastLogins, setLastLogins } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [login, setLogin] = useState(null);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.length === 0 || !email.includes("@")) {
      setEmailValid(true);
    }
    if (password.length === 0) {
      setPasswordValid(true);
    }
    if (!formValid) {
      return;
    } else {
      try {
        setSubmitting(true);
        const response = await fetch(`https://retoolapi.dev/Brjzmm/users`);
        const data = await response.json();
        const emailMatched = data.find((user) => user.email === email);
        setSubmitting(false);
        if (!emailMatched) {
          setLogin("User Not Exist");
          return;
        } else if (emailMatched && emailMatched.password !== password) {
          setLogin("Wrong Password");
          return;
        } else if (emailMatched && emailMatched.password === password) {
          setLogin(null);
          localStorage.setItem("token", emailMatched.token);
          setAuth(emailMatched.token);
          setLastLogins({
            nickName: emailMatched.nickName,
            firstName: emailMatched.firstName,
            pp: emailMatched.pp,
            email: emailMatched.email,
            password: emailMatched.password,
            id: emailMatched.id,
            token: emailMatched.token,
          });
          navigate("/");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // useEffect(() => {
  //   const gettingData = async () => {
  //     const response = await fetch(`https://retoolapi.dev/Brjzmm/users`);
  //     const resData = await response.json();

  //     console.log(resData);
  //   };

  //   gettingData();
  // });

  useEffect(() => {
    if (email.length > 3 && email.includes("@") && password.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (email.length > 3 && email.includes("@")) {
      setEmailValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 0) {
      setPasswordValid(false);
    }
  }, [password]);

  let InvalidLoginContent = () => {
    return <InvalidLogin login={login} setLogin={setLogin} />;
  };

  const closeModeling = () => {
    setLogin(null);
  };

  const deleteReadyAccount = () => {
    setLastLogins([]);
  };

  const readyAccount = () => {
    setEmail(lastLogins.email);
    setPassword(lastLogins.password);
  };

  useEffect(() => {
    if (auth?.auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div>
          <div className={classes.oldLogins}>
            <div className={classes.topSide}>
              <div className={classes.topSideHeader}>
                <img src={logo} className={classes.logoSelf} alt="logo" />
                <div>
                  <h2>Explore Hub</h2>
                  <small>JUST SHARE!</small>
                </div>
              </div>
              <p></p>
            </div>
            <div className={classes.loginInfos}>
              {lastLogins?.length !== 0 ? (
                <h3>Last Login</h3>
              ) : (
                <h3 className={classes.oldLoginLength}>
                  There aren't any old login
                </h3>
              )}
            </div>
            {lastLogins?.length !== 0 && (
              <div className={classes.oneProfile}>
                <div className={classes.cardInside}>
                  <div onClick={readyAccount} className={classes.card}>
                    <div className={classes.photo}>
                      {lastLogins.pp.length !== 0 ? (
                        <img
                          className={classes.photoSelf}
                          src={lastLogins?.pp}
                          alt="pp"
                        />
                      ) : (
                        <img
                          src={avatar}
                          alt="ppIcon"
                          className={classes.photoSelf}
                        />
                      )}
                    </div>
                    <div className={classes.profileInfo}>
                      <p>{lastLogins?.firstName}</p>
                      <small className={classes.nickName}>
                        @{lastLogins?.nickName}
                      </small>
                    </div>
                  </div>
                  <span
                    onClick={deleteReadyAccount}
                    className={classes.closeIcon}
                  >
                    <CancelIcon />
                  </span>
                </div>
              </div>
            )}

            <div className={classes.anyInfo}>
              <small>or login with your account</small>
            </div>
          </div>
        </div>
        <div className={classes.formSide}>
          <h3 className={classes.loginTitle}>Login</h3>
          <form onSubmit={onSubmitHandler} className={classes.form}>
            <div>
              <input
                className={`${classes.input} ${
                  emailValid ? classes.invalidInput : undefined
                }`}
                value={email}
                type="email"
                onChange={emailChangeHandler}
                placeholder="Email adress"
              />
            </div>
            <div>
              <input
                className={`${classes.input} ${
                  passwordValid ? classes.invalidInput : undefined
                }`}
                value={password}
                onChange={passwordChangeHandler}
                placeholder="Password"
                type="password"
              />
            </div>
            <div className={classes.loginBtn}>
              <button
                className={submitting && classes.submitting}
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Loading" : "Login"}
              </button>
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
      {login &&
        ReactDOM.createPortal(
          <div onClick={closeModeling} className={classes.background}></div>,
          document.getElementById("background")
        )}
      {login &&
        ReactDOM.createPortal(
          <InvalidLoginContent />,
          document.getElementById("invalidlogin")
        )}
    </div>
  );
}

export default Login;
