import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./EditProfile.module.css";
import AuthContext from "../../context/Authentication";
import bannerPhoto from "../../assets/casualPhotos/nobanner.png";
import profilePhoto from "../../assets/casualPhotos/profileImg2.png";
import EditProfileInfo from "../../components/EditProfileInfo/EditProfileInfo";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import RemoveAccount from "../../components/RemoveAccount/RemoveAccount";

function EditProfile() {
  const params = useParams();
  const userPath = params.profileId;
  const [submitting, setSubmitting] = useState(false);
  const [ppSide, setPpSide] = useState(null);
  const [bannerSide, setBannerSide] = useState(null);
  const [removeAccount, setRemoveAccount] = useState(null);
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
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
    setBannerSide(e.target.value);
  };

  const pPhotoChangeHandler = (e) => {
    setPPhoto(e.target.value);
    setPpSide(e.target.value);
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
        `https://retoolapi.dev/Brjzmm/users/${userPath}`
      );
      const resData = await response.json();
      setUser(resData);
    };
    asyncFunc();
  }, [auth, userPath]);

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
      setSubmitting(true);
      const submitFunc = async () => {
        const dataPatching = await fetch(
          `https://retoolapi.dev/Brjzmm/users/${userPath}`,
          {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({
              firstName: name,
              lastName: surname,
              nickName: nick,
              pp: pPhoto,
              banner: bannerPP,
              birth: birthDate,
              gender: genders,
              town: town,
              living: living,
            }),
          }
        );
        setUserInfo(dataPatching);
      };
      submitFunc();
    }
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

  let InfoContent = () => {
    return <EditProfileInfo userInfo={userInfo} setUserInfo={setUserInfo} />;
  };

  let RemoveAccountContent = () => {
    return (
      <RemoveAccount
        setRemoveAccount={setRemoveAccount}
        removeAccount={removeAccount}
      />
    );
  };

  let cancelRemoveHandler = () => {
    setRemoveAccount(null);
  };

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        setSubmitting(false);
        navigate("/myprofile");
      }, 500);
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [navigate, auth]);

  const onRemovingHandler = (data) => {
    setRemoveAccount(data);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.photoSide}>
            <img
              src={bannerSide || user?.banner || bannerPhoto}
              className={classes.bannerPhoto}
              alt="banner"
            />
            <img
              src={ppSide || user?.pp || profilePhoto}
              className={`${classes.pp} ${
                user?.gender === "male" && classes.ppMale
              } ${user?.gender === "female" && classes.ppFemale} ${
                user?.gender === "other" && classes.ppOther
              }`}
              alt="banner"
            />
          </div>
          <div className={classes.infoSide}>
            <h3 className={classes.editHeader}>Edit Your Profile</h3>
            <div className={classes.divider}></div>
            <div className={classes.topInfo}>
              <div>
                <div>
                  <label>Firstname</label>
                  <input
                    value={name}
                    onChange={nameChangeHandler}
                    className={`${classes.input} ${
                      nameValid === false && classes.invalidInput
                    }`}
                    placeholder={user?.firstName || "Your name"}
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
                    placeholder={user?.lastName || "Your surname"}
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
                    placeholder={user?.nickName || "Your nick"}
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
                    placeholder={user?.town || "Your town"}
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
                    placeholder={user?.living || "Any city..."}
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
              <button
                className={
                  submitting ? classes.submittingActive : classes.nonSubmitting
                }
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Submitting" : "Save"}
              </button>
              <button
                className={
                  submitting ? classes.submittingActive : classes.nonSubmitting
                }
                disabled={submitting}
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
            <h4 className={classes.orText}>or</h4>
          </div>
        </form>
        <div className={classes.removeAccountBtn}>
          <button onClick={() => onRemovingHandler(user?.id)}>
            <PersonRemoveIcon />
            Remove Account
          </button>
        </div>
      </div>

      {removeAccount &&
        ReactDOM.createPortal(
          <div
            onClick={cancelRemoveHandler}
            className={classes.background}
          ></div>,
          document.getElementById("background")
        )}
      {removeAccount &&
        ReactDOM.createPortal(
          <RemoveAccountContent />,
          document.getElementById("removeaccount")
        )}
      {userInfo &&
        ReactDOM.createPortal(
          <InfoContent />,
          document.getElementById("editprofileinfo")
        )}
    </div>
  );
}

export default EditProfile;
