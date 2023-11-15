import React, { useState } from "react";
import classes from "./RemoveComment.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function RemoveComment(props) {
  const [submitting, setSubmitting] = useState(false);
  // const post = props.postId;
  const comment = props.removeModal;

  const onCancelHandler = () => {
    props.setRemoveModal(null);
  };

  const onRemoveHandler = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `https://retoolapi.dev/bOqEUT/comments/${comment}`,
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
      props.setAllComments((prev) =>
        prev.filter((item) => item?.id !== props.removeModal)
      );
      setSubmitting(false);
      props.setRemoveModal(null);
    }
  };

  return (
    <div className={classes.main}>
      <h3 className={classes.title}>Do you want to remove comment?</h3>
      <div className={classes.buttons}>
        <button onClick={onRemoveHandler}>
          {!submitting && <DeleteForeverIcon fontSize="small" />}
          <h4>
            {submitting ? <div className={classes.spinner}></div> : "Yes"}
          </h4>
        </button>
        <button onClick={onCancelHandler}>
          <h4>No</h4>
        </button>
      </div>
    </div>
  );
}

export default RemoveComment;
