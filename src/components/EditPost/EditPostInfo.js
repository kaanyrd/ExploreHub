import React from "react";
import classes from "./EditPostInfo.module.css";
import ErrorIcon from "@mui/icons-material/Error";
import DoneIcon from "@mui/icons-material/Done";

function EditPostInfo(props) {
  return (
    <div className={classes.main}>
      <div className={classes.text}>
        {props?.resInfo?.status === 200 && (
          <div>
            <DoneIcon fontSize="medium" className={classes.doneIcon} />
            <p>Done!</p>
          </div>
        )}
        {props?.resInfo?.status === 404 && (
          <div>
            <ErrorIcon fontSize="large" className={classes.errorIcon} />
            <p>Couldn't Edit!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPostInfo;
