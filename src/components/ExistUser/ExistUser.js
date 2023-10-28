import React from "react";
import classes from "./ExistUser.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

function ExistUser(props) {
  const navigate = useNavigate();

  const onCloseHandler = () => {
    props.setExistUser(null);
    navigate("/login");
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.errorText}>
          <ErrorIcon className={classes.errorIcon} fontSize="large" />
          <h3 className={classes.errorTitle}>User has already exist!</h3>
        </div>
        <div className={classes.okButton}>
          <button onClick={onCloseHandler}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ExistUser;
