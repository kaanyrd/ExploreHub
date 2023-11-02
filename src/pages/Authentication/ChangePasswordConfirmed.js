import React, { useEffect, useState } from "react";
import classes from "./ChangePasswordConfirmed.module.css";
import logo from "../../assets/icons/logo2.png";
import avatar from "../../assets/casualPhotos/avatar2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordAction } from "../../store/changepassword-slice";

function ChangePasswordConfirmed() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordVal, setPasswordVal] = useState(null);
  const [passwordVal2, setPasswordVal2] = useState(null);
  const [formVal, setFormVal] = useState(false);

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
      password < 8 &&
      (!password.includes("@") ||
        !password.includes("/") ||
        !password.includes("&"))
    ) {
      setPasswordVal(false);
    }
    if (password2 < 8 || password !== password2) {
      setPasswordVal2(false);
    }
    if (formVal) {
      const response = await fetch(
        `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users/${user.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            banner: user.banner,
            gender: user.gender,
            id: user.id,
            token: user.token,
            living: user.living,
            password: password,
            password2: password2,
            pp: user.pp,
            town: user.town,
            birth: user.birth,
            email: user.email,
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      dispatch(ChangePasswordAction.removeUser());
      navigate("/login");
    } else {
      return;
    }
  };

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
                className={`${classes.inputSelf}`}
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
              <button type="submit" className={classes.resetBtn}>
                Submit
              </button>
              <button onClick={goHomeHandler} className={classes.cancelBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordConfirmed;
