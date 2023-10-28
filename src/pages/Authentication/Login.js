import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import pp from "../../assets/casualPhotos/icardi.jpg";
import CancelIcon from "@mui/icons-material/Cancel";
import logo from "../../assets/icons/logo2.png";
import AuthContext from "../../context/Authentication";

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
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  // const [submitting, setSubmitting] = useState(false);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
      const userSelf =
        dataArray.find((user) => user.email === email) &&
        dataArray.find((user) => user.password === password);
      localStorage.setItem("token", userSelf.token);
      setAuth(userSelf.token);
      // setUser(userSelf);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // FIXME
  // const [oldLogins, setOldLogins] = useState(true);
  const oldLogins = true;

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
                type="email"
                onChange={emailChangeHandler}
                placeholder="Email adress or nickname"
              />
            </div>
            <div>
              <input
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
    </div>
  );
}

export default Login;
