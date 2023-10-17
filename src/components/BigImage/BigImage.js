import React from "react";
import classes from "./BigImage.module.css";
import CloseIcon from "@mui/icons-material/Close";

function BigImage(props) {
  const closeHandler = () => {
    props.setImage(null);
  };

  return (
    <div className={classes.image}>
      <div className={classes.imgContent}>
        <CloseIcon
          fontSize="medium"
          className={classes.closeButton}
          onClick={closeHandler}
        />
        <img className={classes.img} src={props.image} alt="img" />
      </div>
    </div>
  );
}

export default BigImage;
