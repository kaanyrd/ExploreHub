import React from "react";
import classes from "./RemoveComment.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function RemoveComment(props) {
  console.log(props);
  const post = props.postId;
  const comment = props.removeModal;

  const onCancelHandler = () => {
    props.setRemoveModal(null);
  };

  const onRemoveHandler = async () => {
    props.setAllComments((prev) =>
      prev.filter((item) => item?.key !== props.removeModal)
    );
    try {
      const response = await fetch(
        `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${post}/comments/${comment}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      props.setRemoveModal(null);
    }
  };

  return (
    <div className={classes.main}>
      <h3 className={classes.title}>Do you want to remove comment?</h3>
      <div className={classes.buttons}>
        <button onClick={onRemoveHandler}>
          <DeleteForeverIcon fontSize="small" />
          <h4>Yes</h4>
        </button>
        <button onClick={onCancelHandler}>
          <h4>No</h4>
        </button>
      </div>
    </div>
  );
}

export default RemoveComment;
