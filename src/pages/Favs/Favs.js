import React from "react";
import classes from "./Favs.module.css";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

function Favs() {
  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.title}>
          <BookmarksIcon fontSize="large" />
          <h3>Your Bookmarks...</h3>
        </div>
        <ul className={classes.bookmarks}>
          {/* {DUMMY_DATA.map((bookmark) => (
            <div className={classes.bookmark} key={bookmark.id}>
              <h4>{bookmark.firstName}</h4>
            </div>
          ))} */}
          <p>No Bookmark Yet...</p>
        </ul>
      </div>
    </div>
  );
}

export default Favs;
