import React, { useContext, useEffect, useState } from "react";
import classes from "./PhotoGallery.module.css";
import AuthContext from "../../context/Authentication";
import { useNavigate } from "react-router-dom";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

function PhotoGallery() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  console.log(images);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

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
        const data = arrData.reverse();
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!images) {
      gettingPhotos();
    }
  }, [images]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h3 className={classes.title}>Photo Gallery</h3>
        {images?.length === 0 && <h4 className={classes.title}>No Image...</h4>}
        <div>
          {images?.length > 0 && images[0] && (
            <div className={classes.photos}>
              <div className={classes.photoSide}>
                <a target="blank" href={images[0]?.mainPhoto}>
                  <img
                    src={images[0]?.mainPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide}>
                <a target="blank" href={images[0]?.secondPhoto}>
                  <img
                    src={images[0]?.secondPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide} d>
                <a target="blank" href={images[0]?.thirdPhoto}>
                  <img
                    src={images[0]?.thirdPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
            </div>
          )}
          {images?.length > 0 && images[1] && (
            <div className={classes.photos}>
              <div className={classes.photoSide}>
                <a target="blank" href={images[1]?.mainPhoto}>
                  <img
                    src={images[1]?.mainPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide}>
                <a target="blank" href={images[1]?.secondPhoto}>
                  <img
                    src={images[1]?.secondPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide} d>
                <a target="blank" href={images[1]?.thirdPhoto}>
                  <img
                    src={images[1]?.thirdPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
            </div>
          )}
          {images?.length > 0 && images[2] && (
            <div className={classes.photos}>
              <div className={classes.photoSide}>
                <a target="blank" href={images[2].mainPhoto}>
                  <img
                    src={images[2]?.mainPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide}>
                <a target="blank" href={images[2]?.secondPhoto}>
                  <img
                    src={images[2]?.secondPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide} d>
                <a target="blank" href={images[2]?.thirdPhoto}>
                  <img
                    src={images[2]?.thirdPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
            </div>
          )}
          {images?.length > 0 && images[3] && (
            <div className={classes.photos}>
              <div className={classes.photoSide}>
                <a target="blank" href={images[3]?.mainPhoto}>
                  <img
                    src={images[3]?.mainPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide}>
                <a target="blank" href={images[3]?.secondPhoto}>
                  <img
                    src={images[3]?.secondPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
              <div className={classes.photoSide} d>
                <a target="blank" href={images[3]?.thirdPhoto}>
                  <img
                    src={images[3]?.thirdPhoto}
                    className={classes.photo}
                    alt="img"
                  />
                  <ZoomInIcon className={classes.zoomIcon} fontSize="large" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;
