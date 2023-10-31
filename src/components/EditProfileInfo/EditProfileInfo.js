import React from "react";
import classes from "./EditProfileInfo.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";

function EditProfileInfo(props) {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {props.userInfo.status === 404 && (
          <div>
            <ErrorIcon fontSize="large" className={classes.errorIcon} /> Profile
            Couldn't Edit
          </div>
        )}
        {props.userInfo.status === 200 && (
          <div>
            <DoneIcon className={classes.doneIcon} fontSize="large" /> Done
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfileInfo;
