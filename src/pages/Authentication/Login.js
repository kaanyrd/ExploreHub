import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import pp from "../../assets/casualPhotos/icardi.jpg";
import CancelIcon from "@mui/icons-material/Cancel";
import logo from "../../assets/icons/logo2.png";
import AuthContext from "../../context/Authentication";
import InvalidLogin from "../../components/InvalidLogin/InvalidLogin";

const DUMMY_DATA = [
  {
    id: "p1",
    firstName: "Mauro",
    lastName: "Icardi",
    nickName: "mauroicardi",
    pp: pp,
  },
  {
    id: "p2",
    firstName: "Fernando",
    lastName: "Muslera",
    nickName: "muslera",
    pp: pp,
  },
  // {
  //   id: "p3",
  //   firstName: "Kaan",
  //   lastName: "Yardımcı",
  //   nickName: "kaanyrd",
  //   pp: pp,
  // },
  // {
  //   id: "4",
  //   firstName: "Kaan",
  //   lastName: "Yardımcı",
  //   nickName: "kaanyrd",
  //   pp: pp,
  // },
];

function Login() {
  // const [oldLogins, setOldLogins] = useState(true);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  // const [user, setUser] = useState(null);
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
        const response = await fetch(
          `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json`
        );
        const data = await response.json();
        let dataArray = [];
        for (let key in data) {
          dataArray.push({
            id: key.toString(),
            ...data[key],
          });
        }

        const emailMatched = dataArray.find((user) => user.email === email);

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
          // setUser(emailMatched);
          navigate("/");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  // FIXME
  let oldLogins = true;

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div>
          {oldLogins && (
            <div className={oldLogins}>
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
              <p className={classes.loginInfos}>
                {DUMMY_DATA.length !== 0 ? (
                  <h3>Last Logins</h3>
                ) : (
                  <h4 className={classes.oldLoginLength}>
                    There aren't any old login
                  </h4>
                )}
              </p>
              <div
                className={`${
                  DUMMY_DATA.length === 1
                    ? classes.oneProfile
                    : classes.profiles
                }`}
              >
                {DUMMY_DATA.map((data) => (
                  <div key={data.id} className={classes.card}>
                    <div className={classes.photo}>
                      <img
                        className={classes.photoSelf}
                        src={data.pp}
                        alt="pp"
                      />
                      <span className={classes.closeIcon}>
                        <CancelIcon />
                      </span>
                    </div>
                    <div className={classes.profileInfo}>
                      <p>{data.firstName}</p>
                      <small className={classes.nickName}>
                        @{data.nickName}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
              {DUMMY_DATA.length !== 0 && (
                <div className={classes.anyInfo}>
                  <small>or login with your account</small>
                </div>
              )}
            </div>
          )}
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
                placeholder="Email adress or nickname"
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
              <button type="submit">Login</button>
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
