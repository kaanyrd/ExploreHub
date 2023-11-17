import React from "react";
import classes from "./LikesModaling.module.css";
import CloseIcon from "@mui/icons-material/Close";
import avatar from "../../assets/casualPhotos/profileImg2.png";

function LikesModaling(props) {
  const closeModal = () => {
    props.setLikeModal(null);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h3 className={classes.title}>All Likes</h3>
        {props?.likes.length > 0 ? (
          <ul className={classes.likeList}>
            {props?.likes.map((like) => (
              <li key={like.id} className={classes.eachLike}>
                <img
                  className={classes.pp}
                  src={like.likerPP || avatar}
                  alt="pp"
                />
                <p>@{like.likerNickName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h4 className={classes.noLikeText}>No like yet!</h4>
        )}
        <CloseIcon onClick={closeModal} className={classes.closeIcon} />
      </div>
    </div>
  );
}

export default LikesModaling;
