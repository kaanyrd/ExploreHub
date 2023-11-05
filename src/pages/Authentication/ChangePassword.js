import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ChangePassword.module.css";
import logo from "../../assets/icons/logo2.png";
import { useDispatch } from "react-redux";
import ChangePasswordInfo from "../../components/ChangePassword/ChangePasswordInfo";
import { ChangePasswordAction } from "../../store/changepassword-slice";
import AuthContext from "../../context/Authentication";

function ChangePassword() {
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email.length === 0 && !email.includes("@")) {
      setEmailValid(false);
    }
    if (emailValid) {
      setSubmitting(true);
      const response = await fetch(
        "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json"
      );
      const responseData = await response.json();
      let arrData = [];
      for (let key in responseData) {
        arrData.push({
          id: key,
          ...responseData[key],
        });
      }
      const user = arrData.find((data) => data.email === email);
      setSubmitting(false);
      if (user === undefined) {
        setUserInfo(true);
      } else {
        dispatch(ChangePasswordAction.catchUser(user));
        navigate("/changepasswordconfirmed");
      }
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    if (email.length > 0 && email.includes("@")) {
      setEmailValid(true);
    }
  }, [email]);

  let UserInfoContent = () => {
    return <ChangePasswordInfo setUserInfo={setUserInfo} />;
  };
  console.log(auth);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

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
          <h3 className={classes.formTitle}>Enter your E-mail</h3>
          <form onSubmit={onSubmitHandler}>
            <div className={classes.formController}>
              <input
                className={`${classes.inputSelf} ${
                  emailValid === false && classes.invalidInput
                }`}
                value={email}
                onChange={emailChangeHandler}
                placeholder="example@test.com"
                type="email"
              />
            </div>
            <div className={classes.submitBtn}>
              <button>{submitting ? "Loading..." : "Continue"}</button>
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
      {userInfo &&
        ReactDOM.createPortal(
          <div className={classes.background}></div>,
          document.getElementById("confirmpassword")
        )}
      {userInfo &&
        ReactDOM.createPortal(
          <UserInfoContent />,
          document.getElementById("confirmpassword")
        )}
    </div>
  );
}

export default ChangePassword;
