import React from "react";
import classes from "./InvalidLogin.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function InvalidLogin(props) {
  const onCloseHandler = () => {
    props.setLogin(null);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.errorText}>
          {props.login === "Wrong Password" ? (
            <ErrorIcon className={classes.errorIcon} fontSize="large" />
          ) : (
            <RemoveCircleIcon className={classes.errorIcon} fontSize="large" />
          )}
          <h3>{props?.login}</h3>
        </div>
        <button className={classes.doneBtn} onClick={onCloseHandler}>
          Close
        </button>
      </div>
    </div>
  );
}

export default InvalidLogin;
