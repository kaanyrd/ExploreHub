import React from "react";
import classes from "./ChangePassword.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

function ChangePasswordInfo(props) {
  const navigate = useNavigate();

  const onCloseHandler = () => {
    props.setUserInfo(null);
  };

  const linkHandler = () => {
    navigate("/signup");
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.description}>
          <ErrorIcon fontSize="large" className={classes.errorIcon} />
          <h3 className={classes.title}>User Not Found</h3>
        </div>
        <div className={classes.buttons}>
          <button
            onClick={linkHandler}
            className={classes.doneBtn}
            to="/signup"
          >
            Create Account
          </button>
          <button className={classes.cancelBtn} onClick={onCloseHandler}>
            Back!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordInfo;
