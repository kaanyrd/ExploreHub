import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./AddPlace.module.css";
import SendIcon from "@mui/icons-material/Send";
import noImg from "../../assets/icons/noImg.png";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.css";
import { EffectCards } from "swiper/modules";
import AuthContext from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import PostInfo from "../../components/PostingInformation/PostInfo";

function AddPlace() {
  const [responseInfo, setResponseInfo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const nowDate = new Date();

  const { auth, lastLogins } = useContext(AuthContext);

  let userId = lastLogins?.id;

  const [country, setCountry] = useState("");
  const [countryValid, setCountryValid] = useState(null);
  const [city, setCity] = useState("");
  const [cityValid, setCityValid] = useState(null);
  const [place, setPlace] = useState("");
  const [placeValid, setPlaceValid] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionValid, setDescriptionValid] = useState(null);
  const [mainPhoto, setMainPhoto] = useState("");
  const [mainPhotoValid, setMainPhotoValid] = useState(null);
  const [secondPhoto, setSecondPhoto] = useState("");
  const [secondPhotoValid, setSecondPhotoValid] = useState(null);
  const [thirdPhoto, setThirdPhoto] = useState("");
  const [thirdPhotoValid, setThirdPhotoValid] = useState(null);

  const [formValid, setFormValid] = useState(false);

  const countryChangeHandler = (e) => {
    setCountry(e.target.value);
  };

  const cityChangeHandler = (e) => {
    setCity(e.target.value);
  };

  const placeChangeHandler = (e) => {
    setPlace(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const photoChangeHandler = (e) => {
    setMainPhoto(e.target.value);
  };

  const secondPhotoChangeHandler = (e) => {
    setSecondPhoto(e.target.value);
  };

  const thirdPhotoChangeHandler = (e) => {
    setThirdPhoto(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (country.length === 0) {
      setCountryValid(false);
    }
    if (city.length === 0) {
      setCityValid(false);
    }
    if (place.length === 0) {
      setPlaceValid(false);
    }
    if (description.length === 0) {
      setDescriptionValid(false);
    }
    if (mainPhoto.length === 0) {
      setMainPhotoValid(false);
    }
    if (secondPhoto.length === 0) {
      setSecondPhotoValid(false);
    }
    if (thirdPhoto.length === 0) {
      setThirdPhotoValid(false);
    }

    if (!formValid) {
      return;
    } else {
      try {
        setSubmitting(true);
        let idGenerate = Math.random().toString();
        const response = await fetch(`https://retoolapi.dev/d2cIkX/posts`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idGenerate,
            user: userId,
            city: city,
            country: country,
            place: place,
            date: {
              day: nowDate.getDate(),
              month: nowDate.getMonth(),
              year: nowDate.getFullYear(),
              hour: nowDate.getHours(),
              minutes: nowDate.getMinutes(),
              seconds: nowDate.getSeconds(),
            },
            description: description,
            mainPhoto: mainPhoto,
            secondPhoto: secondPhoto,
            thirdPhoto: thirdPhoto,
            firstName: users.firstName,
            lastName: users.lastName,
            nickName: users.nickName,
            pp: users.pp,
            email: users.email,
          }),
        });
        const resData = await response.json();
        setResponseInfo(response);
        console.log(resData);
        // navigate("/places");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const usersData = async () => {
      const response = await fetch(
        `https://retoolapi.dev/Brjzmm/users/${userId}`
      );
      const resData = await response.json();
      setUsers(resData);
    };
    usersData();
  }, [userId]);

  useEffect(() => {
    if (country.length > 0) {
      setCountryValid(true);
    }
  }, [country]);

  useEffect(() => {
    if (city.length > 0) {
      setCityValid(true);
    }
  }, [city]);

  useEffect(() => {
    if (place.length > 0) {
      setPlaceValid(true);
    }
  }, [place]);

  useEffect(() => {
    if (description.length > 0) {
      setDescriptionValid(true);
    }
  }, [description]);

  useEffect(() => {
    if (mainPhoto.length > 0) {
      setMainPhotoValid(true);
    }
  }, [mainPhoto]);

  useEffect(() => {
    if (secondPhoto.length > 0) {
      setSecondPhotoValid(true);
    }
  }, [secondPhoto]);

  useEffect(() => {
    if (thirdPhoto.length > 0) {
      setThirdPhotoValid(true);
    }
  }, [thirdPhoto]);

  useEffect(() => {
    if (
      countryValid &&
      cityValid &&
      descriptionValid &&
      placeValid &&
      mainPhotoValid &&
      secondPhotoValid &&
      thirdPhotoValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    countryValid,
    cityValid,
    descriptionValid,
    placeValid,
    mainPhotoValid,
    secondPhotoValid,
    thirdPhotoValid,
  ]);

  let PostContent = () => {
    return (
      <PostInfo responseInfo={responseInfo} setResponseInfo={setResponseInfo} />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (responseInfo) {
        setResponseInfo(null);
        navigate("/places");
        setSubmitting(false);
      }
    }, 500);
  }, [navigate, responseInfo]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.formSide}>
          <h3 className={classes.postTitle}>New Post</h3>
          <form onSubmit={onSubmitHandler}>
            <div className={classes.places}>
              <div className={classes.placement}>
                <div className={classes.formControl}>
                  <input
                    className={`${classes.inputSelf} ${
                      countryValid === false && classes.invalidInput
                    }`}
                    value={country}
                    onChange={countryChangeHandler}
                    placeholder="Country"
                    type="text"
                  />
                </div>
                <div className={classes.formControl}>
                  <input
                    className={`${classes.inputSelf} ${
                      cityValid === false && classes.invalidInput
                    }`}
                    value={city}
                    onChange={cityChangeHandler}
                    placeholder="City"
                    type="text"
                  />
                </div>
              </div>
              <div className={classes.formControl}>
                <input
                  className={`${classes.inputSelf} ${
                    placeValid === false && classes.invalidInput
                  }`}
                  value={place}
                  onChange={placeChangeHandler}
                  placeholder="Place"
                  type="text"
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <div className={classes.length}>
                <strong>({250 - description?.length})</strong>
              </div>
              <div>
                <textarea
                  onChange={descriptionChangeHandler}
                  placeholder="Add a description..."
                  className={`${classes.textArea} ${
                    descriptionValid === false && classes.invalidInput
                  }`}
                  maxLength="250"
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <input
                className={`${classes.inputSelf} ${
                  mainPhotoValid === false && classes.invalidInput
                }`}
                value={mainPhoto}
                onChange={photoChangeHandler}
                placeholder="Main Photo (as URL)"
                type="text"
              />
            </div>
            <div className={classes.formControl}>
              <input
                className={`${classes.inputSelf} ${
                  secondPhotoValid === false && classes.invalidInput
                }`}
                value={secondPhoto}
                onChange={secondPhotoChangeHandler}
                placeholder="Photo 2 (as URL)"
                type="text"
              />
            </div>
            <div className={classes.formControl}>
              <input
                className={`${classes.inputSelf} ${
                  thirdPhotoValid === false && classes.invalidInput
                }`}
                value={thirdPhoto}
                onChange={thirdPhotoChangeHandler}
                placeholder="Photo 3 (as URL)"
                type="text"
              />
            </div>
            <div className={classes.submitBtn}>
              <button disabled={submitting} type="submit">
                {submitting ? "Sending..." : "Share"}
                <SendIcon className={classes.shareIcon} />
              </button>
            </div>
          </form>
        </div>
        <div className={classes.photoSide}>
          <h3 className={classes.photoTitle}>Your Photos</h3>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="img" src={mainPhoto || noImg} alt="img1" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img" src={secondPhoto || noImg} alt="img2" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img" src={thirdPhoto || noImg} alt="img3" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {responseInfo &&
        ReactDOM.createPortal(
          <PostContent />,
          document.getElementById("postinfo")
        )}
    </div>
  );
}

export default AddPlace;
