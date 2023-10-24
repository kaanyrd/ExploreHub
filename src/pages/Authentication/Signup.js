import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import logo from "../../assets/icons/logo2.png";

function Signup() {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState(false);
  // FIXME FOR INPUTS

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("female");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const password2ChangeHandler = (e) => {
    setPassword2(e.target.value);
  };
  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const nickNameHandler = (e) => {
    setNickName(e.target.value);
  };
  const genderHandler = (e) => {
    setGender(e.target.value);
  };
  const birthHandler = (e) => {
    setBirth(e.target.value);
  };

  useEffect(() => {
    if (
      (password.includes("@") ||
        password.includes("/") ||
        password.includes("&")) &&
      password.length >= 8 &&
      password === password2
    ) {
      setConfirmPassword(true);
    } else {
      setConfirmPassword(false);
    }
  }, [password, password2]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      nickName: nickName,
      password: password,
      gender: gender,
      birth: birth,
    };
    // FIXME SMALL DIV IS HERE
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      password2.length === 0 ||
      gender.length === 0 ||
      nickName.length === 0 ||
      birth.length === 0
    ) {
      return;
    }

    try {
      await fetch(
        "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      navigate("/login");
    } catch (error) {
      // FIXME ERROR MODELING
      console.log(error);
    }
  };

  // FIXME EXIST ACCOUNT, SMALL DIV INFORMATION

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
          <form onSubmit={onSubmitHandler}>
            <div className={classes.formLayout}>
              <div>
                <input
                  onChange={firstNameHandler}
                  value={firstName}
                  name="firstName"
                  placeholder="Firstname"
                  type="text"
                  className={classes.normalInput}
                />
              </div>
              <div className={classes.formControl}>
                <input
                  onChange={lastNameHandler}
                  value={lastName}
                  className={classes.normalInput}
                  name="lastName"
                  placeholder="Lastname"
                  type="text"
                />
              </div>
            </div>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input
                  onChange={emailHandler}
                  value={email}
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  className={classes.normalInput}
                />
              </div>
              <div className={classes.formControl}>
                <input
                  onChange={nickNameHandler}
                  value={nickName}
                  name="nickName"
                  placeholder="Nickname"
                  type="text"
                  className={classes.normalInput}
                />
              </div>
            </div>
            <div>
              {!confirmPassword && (
                <small className={classes.info}>
                  Min. 8 chars, requires: &, @, or /
                </small>
              )}
            </div>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input
                  onChange={passwordChangeHandler}
                  value={password}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className={classes.normalInput}
                />
              </div>
              <div className={classes.formControl}>
                <div>
                  <input
                    onChange={password2ChangeHandler}
                    value={password2}
                    placeholder="Confirm Password"
                    type="password"
                    className={`${
                      confirmPassword ? classes.confirmed : classes.notConfirmed
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className={classes.generalInfos}>
              <div>
                <select
                  defaultValue="female"
                  onChange={genderHandler}
                  value={gender}
                  name="gender"
                  className={classes.genderInput}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={classes.formControl}>
                <input
                  onChange={birthHandler}
                  value={birth}
                  className={classes.normalInput}
                  name="birth"
                  type="date"
                />
              </div>
            </div>
            <div className={classes.signBtn}>
              <button type="submit">Signup</button>
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
