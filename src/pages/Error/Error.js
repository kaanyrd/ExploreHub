import React from "react";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import { useNavigate } from "react-router-dom";
import classes from "./Error.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";

function Error() {
  const navigate = useNavigate();
  const goHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.main}>
      <MainNavigation />
      <div className={classes.mainContent}>
        <div className={classes.content}>
          <div className={classes.text}>
            <ErrorIcon className={classes.errorIcon} fontSize="large" />
            <h2>An Error Has Occured!</h2>
          </div>
          <div className={classes.homeBtn}>
            <button onClick={goHomeHandler}>
              <HomeIcon />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
