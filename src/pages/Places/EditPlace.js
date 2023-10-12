import React from "react";
import classes from "./EditPlace.module.css";
import { useParams } from "react-router-dom";

function EditPlace() {
  const params = useParams();

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h2>EditPlace.js</h2>
        {params.placeId}
      </div>
    </div>
  );
}

export default EditPlace;
