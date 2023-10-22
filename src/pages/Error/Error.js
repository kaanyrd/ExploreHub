import React from "react";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import { useNavigate } from "react-router-dom";
import classes from "./Error.module.css";

function Error() {
  const navigate = useNavigate();
  const goHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.main}>
      <MainNavigation />
      <div className={classes.mainContent}>
        <h2>An error has occured</h2>
        <button onClick={goHomeHandler}>Go Home</button>
      </div>
    </div>
  );
}

export default Error;
