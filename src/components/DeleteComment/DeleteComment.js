import React, { useEffect, useState } from "react";
import classes from "./DeleteComment.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";

function DeleteComment(props) {
  const params = useParams();
  const [commentSelf, setCommentSelf] = useState(null);
  const post = params.placesId;

  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await fetch(
          `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${post}/comments.json`
        );

        const resData = await response.json();
        let arrData = [];
        for (let key in resData) {
          arrData.push({
            key: key,
            ...resData[key],
          });
        }
        const comments = arrData.find(
          (comment) => comment.id === props.removeComment
        );
        setCommentSelf(comments?.key);
      } catch (error) {
        console.log(error);
      }
    };
    gettingData();
  }, [post, props.removeComment]);

  const onDeleteHandler = async () => {
    try {
      const response = await fetch(
        `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${post}/comments/${commentSelf}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      const resData = await response.json();
      console.log(resData);
      props.setRemoving(true);
      props.setRemoveComment(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelHandler = () => {
    props.setRemoving(null);
    props.setRemoveComment(null);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <h3 className={classes.title}>Remove Comment ?</h3>
        <div className={classes.buttons}>
          <button onClick={onDeleteHandler}>
            <DeleteIcon className={classes.deleteIcon} />
            Yes
          </button>
          <button onClick={onCancelHandler}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteComment;
