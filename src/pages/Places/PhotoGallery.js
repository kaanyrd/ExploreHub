import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./PhotoGallery.module.css";
import photo2 from "../../assets/casualPhotos/banner2.jpg";
import photo3 from "../../assets/casualPhotos/banner3.jpeg";
import photo4 from "../../assets/casualPhotos/icardi.jpg";
import photo5 from "../../assets/casualPhotos/banner.jpg";
import photo6 from "../../assets/casualPhotos/banner2.jpg";
import photo7 from "../../assets/casualPhotos/banner3.jpeg";
import photo8 from "../../assets/casualPhotos/icardi.jpg";
import photo9 from "../../assets/casualPhotos/muslera1.PNG";
import photo10 from "../../assets/casualPhotos/muslera2.PNG";
import photo11 from "../../assets/casualPhotos/muslera3.PNG";
import photo12 from "../../assets/casualPhotos/photo1.PNG";
import photo13 from "../../assets/casualPhotos/photo2.PNG";
import photo14 from "../../assets/casualPhotos/zaha1.PNG";
import photo15 from "../../assets/casualPhotos/zaha2.PNG";
import photo16 from "../../assets/casualPhotos/zaha3.PNG";
import BigImage from "../../components/BigImage/BigImage";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

function PhotoGallery() {
  const [image, setImage] = useState(null);

  const onSeeBigImg = (data) => {
    setImage(data);
  };

  const onCloseBigImg = () => {
    setImage(null);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h3 className={classes.title}>Photo Gallery</h3>
        <div className={classes.photos}>
          <div
            onClick={() => onSeeBigImg(photo2)}
            className={classes.photoSide}
          >
            <img src={photo2} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo3)}
          >
            <img src={photo3} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo4)}
          >
            <img src={photo4} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo5)}
          >
            <img src={photo5} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo6)}
          >
            <img src={photo6} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo7)}
          >
            <img src={photo7} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo8)}
          >
            <img src={photo8} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo9)}
          >
            <img src={photo9} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo10)}
          >
            <img src={photo10} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo11)}
          >
            <img src={photo11} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo12)}
          >
            <img src={photo12} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo13)}
          >
            <img src={photo13} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo14)}
          >
            <img src={photo14} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo15)}
          >
            <img src={photo15} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo16)}
          >
            <img src={photo16} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
          <div
            className={classes.photoSide}
            onClick={() => onSeeBigImg(photo5)}
          >
            <img src={photo5} className={classes.photo} alt="img" />
            <ZoomInIcon fontSize="large" className={classes.zoomIcon} />
          </div>
        </div>
        {image &&
          ReactDOM.createPortal(
            <BigImage image={image} setImage={setImage} />,
            document.getElementById("bigimg")
          )}
        {image &&
          ReactDOM.createPortal(
            <div onClick={onCloseBigImg} className={classes.background}></div>,
            document.getElementById("background")
          )}
      </div>
    </div>
  );
}

export default PhotoGallery;
