import React, { useState } from "react";
import classes from "./AddPlace.module.css";
import SendIcon from "@mui/icons-material/Send";
import noImg from "../../assets/icons/noImg.png";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";

import photo1 from "../../assets/casualPhotos/muslera1.PNG";
import photo2 from "../../assets/casualPhotos/muslera2.PNG";
import photo3 from "../../assets/casualPhotos/muslera3.PNG";

function AddPlace() {
  const [length, setLength] = useState(0);

  const lengthHandler = (e) => {
    setLength(e.target.value.length);
  };
  console.log(length);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.formSide}>
          <h3 className={classes.postTitle}>New Post</h3>
          <form>
            <div className={classes.places}>
              <div className={classes.placement}>
                <div className={classes.formControl}>
                  <input placeholder="Country" type="text" />
                </div>
                <div className={classes.formControl}>
                  <input placeholder="City" type="text" />
                </div>
              </div>
              <div className={classes.formControl}>
                <input placeholder="Place" type="text" />
              </div>
            </div>
            <div className={classes.formControl}>
              <div className={classes.length}>
                <strong>({250 - length})</strong>
              </div>
              <div>
                <textarea
                  onChange={lengthHandler}
                  placeholder="Add a description..."
                  className={classes.textArea}
                  maxLength={`250 - ${length}`}
                />
              </div>
            </div>
            <div className={classes.formControl}>
              <input placeholder="Main Photo (as URL)" type="text" />
            </div>
            <div className={classes.formControl}>
              <input placeholder="Photo 2 (as URL)" type="text" />
            </div>
            <div className={classes.formControl}>
              <input placeholder="Photo 3 (as URL)" type="text" />
            </div>
            <div className={classes.submitBtn}>
              <button>
                Share
                <SendIcon className={classes.shareIcon} />
              </button>
            </div>
          </form>
        </div>
        <div className={classes.photoSide}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="img" src={noImg} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img" src={noImg} alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="img" src={noImg} alt="img" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default AddPlace;
