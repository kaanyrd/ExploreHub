import React from "react";
import classes from "./ProfileInfo.module.css";
import { useDispatch } from "react-redux";
import { ProfileAction } from "../../store/profileInfo-slice";
import photo from "../../assets/casualPhotos/icardi.jpg";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfileInfo() {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(ProfileAction.closeProfile());
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {/* FIXME */}
        <img src={photo} alt="img" className={classes.pp} />
        {/* <AccountCircleIcon fontSize="large" className={classes.pp} /> */}
        <h4 className={classes.name}>Mauro Icardi</h4>
        <h4 className={classes.nickname}>@mauroicardi</h4>
        <Link className={classes.logoutButton}>
          <span>Logout </span>
          <LogoutIcon />
        </Link>
        <button className={classes.closeButton} onClick={closeHandler}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
