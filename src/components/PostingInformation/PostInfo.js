import React from "react";
import classes from "./ProfileInfo.module.css";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function PostInfo(props) {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {props?.responseInfo?.status === 201 && (
          <div className={classes.confirmedSide}>
            <DoneIcon fontSize="medium" className={classes.confirmed} />{" "}
            <span>Posted</span>
          </div>
        )}
        {props?.responseInfo?.status !== 201 && (
          <div>
            <div className={classes.infos}>
              <ClearIcon fontSize="medium" className={classes.failed} />{" "}
              <span>Post Failed</span>
            </div>

            <div>
              <h4>{props?.responseInfo?.message}</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostInfo;
