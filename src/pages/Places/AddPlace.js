import React from "react";
import classes from "./AddPlace.module.css";
import SendIcon from "@mui/icons-material/Send";

function AddPlace() {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h3 className={classes.postTitle}>New Post</h3>
        <form>
          <div className={classes.formControl}>
            <input placeholder="Country" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="City" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="Place" type="text" />
          </div>
          <div className={classes.formControl}>
            <textarea
              placeholder="Add a description..."
              className={classes.textArea}
            />
          </div>
          <div className={classes.formControl}>
            <input placeholder="Main Photo (as URL)" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="Photo 2 (as URL)" type="text" />
          </div>
          <div className={classes.formControl}>
            <input placeholder="Photo 3 (as URL)" type="text" />
          </div>
          <div className={classes.submitBtn}>
            <button>
              Share
              <SendIcon className={classes.shareIcon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlace;
