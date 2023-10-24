import React from "react";
import classes from "./SmallInfo.module.css";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function SmallInfo(props) {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {props?.res?.status === 200 && (
          <div className={classes.confirmedSide}>
            <DoneIcon className={classes.confirmed} />{" "}
            <span>Signup Succsessfull</span>
          </div>
        )}
        {props?.res?.status !== 200 && (
          <div>
            <div className={classes.infos}>
              <ClearIcon className={classes.failed} />{" "}
              <span>Signup Failed</span>
            </div>

            <div>
              <h4>{props?.res?.message}</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmallInfo;
