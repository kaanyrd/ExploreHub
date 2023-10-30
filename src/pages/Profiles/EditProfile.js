import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./EditProfile.module.css";
import AuthContext from "../../context/Authentication";
import bannerPhoto from "../../assets/casualPhotos/nobanner.png";
import profilePhoto from "../../assets/casualPhotos/profileImg2.png";

function EditProfile() {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/myprofile");
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const surnameChangeHandler = (e) => {
    setSurname(e.target.value);
  };
  const birthChangeHandler = (e) => {
    setBirthDate(e.target.value);
  };

  const genderChangeHandler = (e) => {
    setGenders(e.target.value);
  };

  const bannerChangeHandler = (e) => {
    setBannerPP(e.target.value);
  };

  const pPhotoChangeHandler = (e) => {
    setPPhoto(e.target.value);
  };

  const townChangeHandler = (e) => {
    setTown(e.target.value);
  };

  const livingChangeHandler = (e) => {
    setLiving(e.target.value);
  };

  const nickChangeHandler = (e) => {
    setNick(e.target.value);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await fetch(
        `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json`
      );
      const responseData = await response.json();
      let arrData = [];

      for (let key in responseData) {
        arrData.push({
          id: key,
          ...responseData[key],
        });
      }
      const user = arrData.find((user) => user.token.toString() === auth);
      setUser(user);
    };
    asyncFunc();
  }, [auth]);

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(null);
  const [surname, setSurname] = useState("");
  const [surnameValid, setSurnameValid] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateValid, setBirthDateValid] = useState(null);
  const [bannerPP, setBannerPP] = useState("");
  const [bannerPPValid, setBannerPPValid] = useState(null);
  const [pPhoto, setPPhoto] = useState("");
  const [pPhotoValid, setpPhotoValid] = useState(null);
  const [town, setTown] = useState("");
  const [townValid, setTownValid] = useState(null);
  const [living, setLiving] = useState("");
  const [livingValid, setLivingValid] = useState(null);
  const [genders, setGenders] = useState("female");
  const [gendersValid, setGendersValid] = useState(null);
  const [nick, setNick] = useState("");
  const [nickValid, setNickValid] = useState(null);

  const [formValid, setFormValid] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setNameValid(false);
    }
    if (surname.length === 0) {
      setSurnameValid(false);
    }
    if (nick.length === 0) {
      setNickValid(false);
    }
    if (birthDate.length === 0) {
      setBirthDateValid(false);
    }
    if (bannerPP.length === 0) {
      setBannerPPValid(false);
    }
    if (pPhoto.length === 0) {
      setpPhotoValid(false);
    }
    if (town.length === 0) {
      setTownValid(false);
    }
    if (living.length === 0) {
      setLivingValid(false);
    }
    if (genders.length === 0) {
      setGendersValid(false);
    }

    if (!formValid) {
      return;
    } else {
      console.log(
        name,
        surname,
        nick,
        birthDate,
        bannerPP,
        pPhoto,
        town,
        living,
        genders
      );
      console.log("Gönderildi");
    }
    // navigate()
  };

  useEffect(() => {
    if (name.length > 0) {
      setNameValid(true);
    }
    if (surname.length > 0) {
      setSurnameValid(true);
    }
    if (genders.length > 0) {
      setGendersValid(true);
    }
    if (nick.length > 0) {
      setNickValid(true);
    }
    if (birthDate.length > 0) {
      setBirthDateValid(true);
    }
    if (pPhoto.length > 0) {
      setpPhotoValid(true);
    }
    if (bannerPP.length > 0) {
      setBannerPPValid(true);
    }
    if (town.length > 0) {
      setTownValid(true);
    }
    if (living.length > 0) {
      setLivingValid(true);
    }
  }, [name, surname, town, living, bannerPP, pPhoto, birthDate, nick, genders]);

  useEffect(() => {
    if (
      nameValid &&
      surnameValid &&
      gendersValid &&
      townValid &&
      livingValid &&
      bannerPPValid &&
      pPhotoValid &&
      birthDateValid &&
      nickValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    nameValid,
    surnameValid,
    gendersValid,
    townValid,
    livingValid,
    bannerPPValid,
    pPhotoValid,
    birthDateValid,
    nickValid,
  ]);

  return (
    <div className={classes.main}>
      <form onSubmit={onSubmitHandler} className={classes.mainContent}>
        <div className={classes.photoSide}>
          <img
            src={user?.banner || bannerPhoto}
            className={classes.bannerPhoto}
            alt="banner"
          />
          <img
            src={user?.pp || profilePhoto}
            className={`${classes.pp} ${
              user?.gender === "male" && classes.ppMale
            } ${user?.gender === "female" && classes.ppFemale} ${
              user?.gender === "other" && classes.ppOther
            }`}
            alt="banner"
          />
        </div>
        <div className={classes.infoSide}>
          <div className={classes.topInfo}>
            <div>
              <div>
                <label>Firstname</label>
                <input
                  onChange={nameChangeHandler}
                  value={name}
                  className={`${classes.input} ${
                    nameValid === false && classes.invalidInput
                  }`}
                  placeholder="Your Firstname"
                />
              </div>
              <div>
                <label>Lastname</label>
                <input
                  onChange={surnameChangeHandler}
                  value={surname}
                  className={`${classes.input} ${
                    surnameValid === false && classes.invalidInput
                  }`}
                  placeholder="Your Lastname"
                />
              </div>
              <div>
                <label>Nickname</label>
                <input
                  onChange={nickChangeHandler}
                  value={nick}
                  className={`${classes.input} ${
                    nickValid === false && classes.invalidInput
                  }`}
                  placeholder="Your Nickname"
                />
              </div>
              <div>
                <label>Profil Photo</label>
                <input
                  onChange={pPhotoChangeHandler}
                  value={pPhoto}
                  placeholder="As URL"
                  className={`${classes.input} ${
                    pPhotoValid === false && classes.invalidInput
                  }`}
                  type="text"
                />
              </div>
            </div>
            <div>
              <div>
                <label>Banner Photo as URL</label>
                <input
                  onChange={bannerChangeHandler}
                  value={bannerPP}
                  placeholder="As URL"
                  className={`${classes.input} ${
                    bannerPPValid === false && classes.invalidInput
                  }`}
                  type="text"
                />
              </div>
              <div>
                <label className={classes.iconSide}>Town is</label>
                <input
                  onChange={townChangeHandler}
                  className={`${classes.input} ${
                    townValid === false && classes.invalidInput
                  }`}
                  value={town}
                  placeholder="Your town"
                />
              </div>
              <div>
                <label className={classes.iconSide}>Living in</label>
                <input
                  onChange={livingChangeHandler}
                  className={`${classes.input} ${
                    livingValid === false && classes.invalidInput
                  }`}
                  value={living}
                  placeholder="Any city..."
                />
              </div>

              <div className={classes.genderSide}>
                <div>
                  <label className={classes.iconSide}>Birth </label>
                  <input
                    onChange={birthChangeHandler}
                    className={`${classes.input} ${
                      birthDateValid === false && classes.invalidInput
                    }`}
                    type="date"
                    defaultValue={user?.birth}
                    value={birthDate}
                  />
                </div>
                <div>
                  <label>Gender</label>
                  <select
                    onChange={genderChangeHandler}
                    value={genders}
                    className={`${classes.selectSide} ${
                      gendersValid === false && classes.invalidInput
                    }`}
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.saveButton}>
            <button type="submit">Save</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
