import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./EditPlace.module.css";
import { useNavigate, useParams } from "react-router-dom";
import EditPostInfo from "../../components/EditPost/EditPostInfo";
import avatar from "../../assets/casualPhotos/profileImg2.png";

function EditPlace() {
  const params = useParams();
  const navigate = useNavigate();
  const postID = params.placeId;
  const [resInfo, setResInfo] = useState(null);
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(1);
  const [description, setDescription] = useState("");
  const [descriptionValid, setDescriptionValid] = useState(null);
  const [mainPhoto, setMainPhoto] = useState("");
  const [mainPhotoValid, setMainPhotoValid] = useState(null);
  const [secondPhoto, setSecondPhoto] = useState("");
  const [secondPhotoValid, setSecondPhotoValid] = useState(null);
  const [thirdPhoto, setThirdPhoto] = useState("");
  const [thirdPhotoValid, setThirdPhotoValid] = useState(null);

  const [formValid, setFormValid] = useState(false);

  const descriptionOnChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const mainPhotoChangeHandler = (e) => {
    setMainPhoto(e.target.value);
  };

  const secondPhotoChangeHandler = (e) => {
    setSecondPhoto(e.target.value);
  };

  const thirdPhotoChangeHandler = (e) => {
    setThirdPhoto(e.target.value);
  };

  const firstPhotoHandler = () => {
    setImage(1);
  };
  const secondPhotoHandler = () => {
    setImage(2);
  };
  const thirdPhotoHandler = () => {
    setImage(3);
  };

  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await fetch(
          `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${postID}.json`
        );
        const responseData = await response.json();

        setPost(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    gettingData();
  }, [postID]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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

    if (formValid) {
      try {
        const response = await fetch(
          `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${postID}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: description,
              mainPhoto: mainPhoto,
              secondPhoto: secondPhoto,
              thirdPhoto: thirdPhoto,
            }),
          }
        );
        setResInfo(response);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

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
      descriptionValid &&
      mainPhotoValid &&
      secondPhotoValid &&
      thirdPhotoValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [descriptionValid, mainPhotoValid, secondPhotoValid, thirdPhotoValid]);

  const goHomeHandler = () => {
    navigate("..");
  };

  useEffect(() => {
    if (resInfo) {
      setTimeout(() => {
        setResInfo(null);
        navigate("..");
      }, 1500);
    }
  }, [navigate, resInfo]);

  let EditPostContent = () => {
    return <EditPostInfo resInfo={resInfo} />;
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.list}>
          <div key={post?.id} className={classes.card}>
            <div className={classes.contentLeft}>
              <div className={classes.cardTop}>
                <div className={classes.ppSide}>
                  <img
                    className={classes.ppSelf}
                    src={post?.pp || avatar}
                    alt={post?.nickName}
                  />
                </div>

                <div>
                  <div className={classes.info}>
                    <strong>@{post?.nickName}</strong>{" "}
                    <span className={classes.dot}>•</span> 3h ago{" "}
                    <span className={classes.dot}>•</span> at {post?.place} (
                    {post?.city}, {post?.country})
                    <div className={classes.country}></div>
                  </div>
                </div>
              </div>
              <div className={classes.imgs}>
                {image === 1 && (
                  <img
                    src={mainPhoto || post?.mainPhoto}
                    className={classes.imgSelf}
                    alt={post?.nickName}
                  />
                )}
                {image === 2 && (
                  <img
                    src={secondPhoto || post?.secondPhoto}
                    className={classes.imgSelf}
                    alt={post?.nickName}
                  />
                )}
                {image === 3 && (
                  <img
                    src={thirdPhoto || post?.thirdPhoto}
                    className={classes.imgSelf}
                    alt={post?.nickName}
                  />
                )}
                <div className={classes.buttonSide}>
                  <button
                    className={`${classes.buttonSelf} ${
                      image === 1 ? classes.activeBtn : undefined
                    }`}
                    onClick={firstPhotoHandler}
                  >
                    1
                  </button>
                  <button
                    className={`${classes.buttonSelf} ${
                      image === 2 ? classes.activeBtn : undefined
                    }`}
                    onClick={secondPhotoHandler}
                  >
                    2
                  </button>
                  <button
                    className={`${classes.buttonSelf} ${
                      image === 3 ? classes.activeBtn : undefined
                    }`}
                    onClick={thirdPhotoHandler}
                  >
                    3
                  </button>
                </div>
              </div>
              <div className={classes.explanation}>
                <p className={classes.texting}>
                  <strong>
                    {post?.firstName} {post?.lastName} says:{" "}
                  </strong>
                  {description || post?.description}
                </p>
              </div>
            </div>
            <div className={classes.editSide}>
              <h3 className={classes.editTitle}>Edit Your Post!</h3>
              <div className={classes.divider}></div>
              <form onSubmit={onSubmitHandler}>
                <div className={classes.formControl}>
                  <div className={classes.length}>
                    <strong>({250 - description.length})</strong>
                  </div>
                  <textarea
                    onChange={descriptionOnChangeHandler}
                    placeholder="Your description"
                    className={`${classes.textArea} ${
                      descriptionValid === false && classes.invalidTextArea
                    }`}
                    maxLength="250"
                    value={description}
                  />
                </div>
                <div className={classes.formControl}>
                  <input
                    className={`${classes.inputSelf} ${
                      mainPhotoValid === false && classes.invalidInput
                    }`}
                    onChange={mainPhotoChangeHandler}
                    placeholder="Photo 1 (as URL)"
                    type="text"
                    value={mainPhoto}
                  />
                </div>
                <div className={classes.formControl}>
                  <input
                    className={`${classes.inputSelf} ${
                      secondPhotoValid === false && classes.invalidInput
                    }`}
                    onChange={secondPhotoChangeHandler}
                    placeholder="Photo 2 (as URL)"
                    type="text"
                    value={secondPhoto}
                  />
                </div>
                <div className={classes.formControl}>
                  <input
                    className={`${classes.inputSelf} ${
                      thirdPhotoValid === false && classes.invalidInput
                    }`}
                    onChange={thirdPhotoChangeHandler}
                    placeholder="Photo 3 (as URL)"
                    type="text"
                    value={thirdPhoto}
                  />
                </div>
                <div className={classes.submitButtons}>
                  <button type="submit">Save</button>
                  <button onClick={goHomeHandler}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {resInfo &&
        ReactDOM.createPortal(
          <EditPostContent />,
          document.getElementById("editpostinfo")
        )}
    </div>
  );
}

export default EditPlace;
