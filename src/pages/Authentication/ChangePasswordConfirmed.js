import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./ChangePasswordConfirmed.module.css";
import logo from "../../assets/icons/logo2.png";
import avatar from "../../assets/casualPhotos/avatar2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordAction } from "../../store/changepassword-slice";
import PasswordConfirmed from "../../components/PasswordConfirmed/PasswordConfirmed";
import AuthContext from "../../context/Authentication";

function ChangePasswordConfirmed() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordVal, setPasswordVal] = useState(null);
  const [passwordVal2, setPasswordVal2] = useState(null);
  const [formVal, setFormVal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const user = useSelector((state) => state.changePasswordSlice.user);
  const dispatch = useDispatch();

  const passChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const pass2ChangeHandler = (e) => {
    setPassword2(e.target.value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      password < 8 ||
      (!password.includes("@") &&
        !password.includes("/") &&
        !password.includes("&"))
    ) {
      setPasswordVal(false);
    }
    if (password2 < 8 || password !== password2) {
      setPasswordVal2(false);
    }
    if (formVal) {
      setSubmitting(true);
      const response = await fetch(
        `https://retoolapi.dev/Brjzmm/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            password2: password2,
          }),
        }
      );
      setUserInfo(response);
    } else {
      return;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (userInfo) {
        dispatch(ChangePasswordAction.removeUser());
        navigate("/login");
        setSubmitting(false);
      }
    }, 1000);
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (
      password.length > 7 &&
      (password.includes("@") ||
        password.includes("/") ||
        password.includes("&"))
    ) {
      setPasswordVal(true);
    }
  }, [password]);

  useEffect(() => {
    if (password === password2 && password2.length > 7) {
      setPasswordVal2(true);
    }
  }, [password, password2]);

  const goHomeHandler = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (passwordVal && passwordVal2 && password === password2) {
      setFormVal(true);
    } else {
      setFormVal(false);
    }
  }, [passwordVal, passwordVal2, password, password2]);

  let PasswordConfirmedContent = () => {
    return <PasswordConfirmed userInfo={userInfo} />;
  };

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [auth, navigate, user]);

  return (
    <div className={classes.content}>
      <div className={classes.mainContent}>
        <div className={classes.contentLeft}>
          <div className={classes.infoSide}>
            <img className={classes.logo} src={logo} alt="logo" />
            <h2>Almost Done!</h2>
            <h3>Step 2/2</h3>
            <p className={classes.infoText}>
              You can now reset your password...
            </p>
          </div>
        </div>
        <div className={classes.formSide}>
          <div className={classes.yourProfile}>
            <img className={classes.pp} alt="pp" src={user?.pp || avatar} />
            <div className={classes.profileInfo}>
              <div className={classes.profileControl}>
                <h4>
                  {user?.firstName} {user?.lastName}
                </h4>
              </div>
              <div className={classes.profileControl}>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className={classes.formController}>
              <p>
                {password.length < 8 ||
                (!password.includes("@") &&
                  !password.includes("&") &&
                  !password.includes("/")) ? (
                  <small className={classes.inputInfo}>
                    Min. 8 chars, requires: &, @, or /
                  </small>
                ) : (
                  ""
                )}
              </p>
              <input
                value={password}
                onChange={passChangeHandler}
                className={`${classes.inputSelf} ${
                  passwordVal === false && classes.invalidInput
                }`}
                placeholder="New password"
                type="password"
              />
            </div>
            <div className={classes.formController}>
              <input
                value={password2}
                onChange={pass2ChangeHandler}
                className={`${classes.passwordValidation} ${
                  formVal && classes.formValid
                }`}
                placeholder="Confirm your password"
                type="password"
              />
            </div>
            <div className={classes.submitBtn}>
              <button
                disabled={submitting}
                type="submit"
                className={`${classes.resetBtn} ${
                  submitting && classes.submittingButton
                }`}
              >
                {submitting ? "Loading..." : "Submit"}
              </button>
              <button
                disabled={submitting}
                onClick={goHomeHandler}
                className={classes.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {userInfo &&
        ReactDOM.createPortal(
          <PasswordConfirmedContent />,
          document.getElementById("confirmedpassword")
        )}
    </div>
  );
}

export default ChangePasswordConfirmed;
