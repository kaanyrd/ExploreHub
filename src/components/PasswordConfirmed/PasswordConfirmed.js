import React from "react";
import classes from "./PasswordConfirmed.module.css";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

function PasswordConfirmed(props) {
  console.log(props.userInfo);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {props?.userInfo?.status === 200 && (
          <div className={classes.text}>
            <DoneIcon className={classes.doneIcon} />
            <p>Password Changed!</p>
          </div>
        )}
        {props?.userInfo?.status === 404 && (
          <div className={classes.text}>
            <ErrorIcon className={classes.errorIcon} />
            <p>Something Went Wrong</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordConfirmed;
