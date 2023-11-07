import React, { useContext, useEffect, useState } from "react";
import classes from "./PhotoGallery.module.css";
import AuthContext from "../../context/Authentication";
import { useNavigate } from "react-router-dom";

function PhotoGallery() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [images, setImages] = useState(null);

  // FIXME
  // "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts.json?orderBy=\"$key\"&limitToLast=5"

  useEffect(() => {
    const gettingPhotos = async () => {
      try {
        const response = await fetch(
          "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts.json"
        );
        const resData = await response.json();

        let arrData = [];
        for (let key in resData) {
          arrData.push({
            id: key,
            ...resData[key],
          });
        }
        const data = arrData.reverse().slice(0, 3);
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };
    gettingPhotos();
  }, [images]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  console.log(images);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h3 className={classes.title}>Photo Gallery</h3>
        {images?.length === 0 && <h4 className={classes.title}>No Image...</h4>}
        <div>
          {images?.map((post) => (
            <div className={classes.photos}>
              <div className={classes.photoSide}>
                <img src={post.mainPhoto} className={classes.photo} alt="img" />
              </div>
              <div className={classes.photoSide}>
                <img
                  src={post?.secondPhoto}
                  className={classes.photo}
                  alt="img"
                />
              </div>
              <div className={classes.photoSide} d>
                <img
                  src={post?.thirdPhoto}
                  className={classes.photo}
                  alt="img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;
