import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import logo from "../../assets/icons/logo2.png";
import SmallInfo from "../../components/SmallInfo/SmallInfo";
import ExistUser from "../../components/ExistUser/ExistUser";

function Signup() {
  const navigate = useNavigate();
  const [resData, setResData] = useState(null);
  const [sended, setSended] = useState(false);

  // FIXME FOR INPUTS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("female");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // FIXME EXIST ACCOUNT, SMALL DIV INFORMATION
  const [formValid, setFormValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [nameValid, setNameValid] = useState(null);
  const [lastNameValid, setLastNameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [nickValid, setNickValid] = useState(null);
  const [genderValid, setGenderValid] = useState(null);
  const [birthValid, setBirthValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [existUser, setExistUser] = useState(null);

  const nameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  const surnameChangeHandler = (e) => {
    setLastName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const nicknameChangeHandler = (e) => {
    setNickName(e.target.value);
  };

  const genderChangeHandler = (e) => {
    setGender(e.target.value);
  };

  const birthChangeHandler = (e) => {
    setBirth(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordChangeHandler2 = (e) => {
    setPassword2(e.target.value);
  };

  // CONFIRMED PASSWORD
  useEffect(() => {
    if (
      password === password2 &&
      password.length >= 8 &&
      password2.length >= 8 &&
      (password.includes("@") ||
        password.includes("/") ||
        password.includes("&"))
    ) {
      setConfirmPassword(true);
    } else {
      setConfirmPassword(false);
    }
  }, [password, password2]);

  // FORM CONFIRMED
  useEffect(() => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      password.length === 0 ||
      password2.length === 0 ||
      birth.length === 0 ||
      nickName.length === 0 ||
      gender.length === 0 ||
      email.length === 0
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    firstName,
    lastName,
    password,
    password2,
    birth,
    nickName,
    gender,
    email,
  ]);

  useEffect(() => {
    if (firstName.length > 0) {
      setNameValid(false);
    }
  }, [firstName]);

  useEffect(() => {
    if (lastName.length > 0) {
      setLastNameValid(false);
    }
  }, [lastName]);

  useEffect(() => {
    if (email.length > 0 && email.includes("@")) {
      setEmailValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (nickName.length > 0) {
      setNickValid(false);
    }
  }, [nickName]);

  useEffect(() => {
    if (password.length > 0) {
      setPasswordValid(false);
    }
  }, [password]);

  useEffect(() => {
    if (gender.length > 0) {
      setGenderValid(false);
    }
  }, [gender]);

  useEffect(() => {
    if (birth.length > 0) {
      setBirthValid(false);
    }
  }, [birth]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (firstName.length === 0) {
      setNameValid(true);
    }
    if (lastName.length === 0) {
      setLastNameValid(true);
    }
    if (nickName.length === 0) {
      setNickValid(true);
    }
    if (email.length === 0 && !email.includes("@")) {
      setEmailValid(true);
    }
    if (password.length === 0) {
      setPasswordValid(true);
    }
    if (gender.length === 0) {
      setGenderValid(true);
    }
    if (birth.length === 0) {
      setBirthValid(true);
    }
    if (!formValid && confirmPassword) {
      const data = {
        token: Math.random(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender: gender.trim(),
        password: password.trim(),
        password2: password2.trim(),
        birth: birth.trim(),
        email: email.trim(),
        nickName: nickName.trim(),
        pp: "",
        banner: "",
      };
      try {
        const control = await fetch(
          "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json"
        );

        const controlResponse = await control.json();

        let dataArr = [];

        for (let key in controlResponse) {
          dataArr.push({
            id: key,
            ...controlResponse[key],
          });
        }
        const userControl =
          dataArr.find((user) => user.email === email) &&
          dataArr.find((user) => user.firstName === firstName) &&
          dataArr.find((user) => user.lastName === lastName) &&
          dataArr.find((user) => user.nickName === nickName);

        if (userControl) {
          setExistUser(userControl);
          return;
        } else {
          setSended(true);
          const response = await fetch(
            "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          setResData(response);
        }
      } catch (error) {
        setResData(error);
      }
      setShowModal(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (resData) {
        setShowModal(false);
        setSended(false);
        navigate("/login");
      } else {
        return;
      }
    }, 2000);
  }, [resData, navigate]);

  let ExistUserLayout = () => {
    return <ExistUser setExistUser={setExistUser} existUser={existUser} />;
  };

  const onCloseErrorModal = () => {
    navigate("/login");
    setExistUser(null);
  };

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
                  value={firstName}
                  name="firstName"
                  placeholder="Firstname"
                  type="text"
                  onChange={nameChangeHandler}
                  className={`${classes.normalInput} ${
                    nameValid && classes.inputFree
                  }`}
                />
              </div>
              <div className={classes.formControl}>
                <input
                  value={lastName}
                  className={`${classes.normalInput} ${
                    lastNameValid && classes.inputFree
                  }`}
                  name="lastName"
                  placeholder="Lastname"
                  type="text"
                  onChange={surnameChangeHandler}
                />
              </div>
            </div>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input
                  value={email}
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  className={`${classes.normalInput} ${
                    emailValid && classes.inputFree
                  }`}
                  onChange={emailChangeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <input
                  value={nickName}
                  name="nickName"
                  placeholder="Nickname"
                  type="text"
                  className={`${classes.normalInput} ${
                    nickValid && classes.inputFree
                  }`}
                  onChange={nicknameChangeHandler}
                />
              </div>
            </div>
            <div>
              {(password.length < 8 ||
                (!password.includes("@") &&
                  !password.includes("/") &&
                  !password.includes("&"))) && (
                <small className={classes.info}>
                  Min. 8 chars, requires: &, @, or /
                </small>
              )}
            </div>
            <div className={classes.formLayout}>
              <div className={classes.formControl}>
                <input
                  value={password}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className={`${classes.normalInput} ${
                    passwordValid && classes.inputFree
                  }`}
                  onChange={passwordChangeHandler}
                />
              </div>
              <div className={classes.formControl}>
                <div>
                  <input
                    value={password2}
                    placeholder="Confirm Password"
                    type="password"
                    className={`${
                      confirmPassword ? classes.confirmed : classes.notConfirmed
                    }`}
                    onChange={passwordChangeHandler2}
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <select
                  defaultValue="female"
                  value={gender}
                  name="gender"
                  className={`${classes.genderInput} ${
                    genderValid && classes.inputFree
                  }`}
                  onChange={genderChangeHandler}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={`${classes.formControl} ${classes.birthSide}`}>
                <small>*birth</small>
                <input
                  value={birth}
                  className={`${classes.normalInput} ${
                    birthValid && classes.inputFree
                  }`}
                  name="birth"
                  type="date"
                  onChange={birthChangeHandler}
                />
              </div>
            </div>
            <div className={classes.signBtn}>
              <button className={sended && classes.sending} type="submit">
                {sended ? "Submitting!" : "Signup"}
              </button>
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
      {showModal && resData && <SmallInfo res={resData} />}
      {existUser &&
        ReactDOM.createPortal(
          <div
            onClick={onCloseErrorModal}
            className={classes.background}
          ></div>,
          document.getElementById("background")
        )}
      {existUser &&
        ReactDOM.createPortal(
          <ExistUserLayout />,
          document.getElementById("existuser")
        )}
    </div>
  );
}

export default Signup;
