import React from "react";
import classes from "./PostDelete.module.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function PostDelete(props) {
  const postId = props.removing;
  const navigate = useNavigate();

  const yesHandler = async () => {
    props.setPost((prev) => prev.filter((item) => item.key !== postId));
    try {
      const resposne = await fetch(
        `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${postId}.json`,
        {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: null,
        }
      );
      const resData = await resposne.json();
      console.log(resData);
      navigate("/myprofile");
    } catch (error) {
      console.log(error);
    }
    props.setRemoving(null);
  };

  const noHandler = () => {
    props.setRemoving(null);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.header}>
          <h3 className={classes.text}>Do you want to remove post ?</h3>
        </div>
        <div className={classes.buttons}>
          <button className={classes.yesBtn} onClick={yesHandler}>
            <DeleteIcon fontSize="small" className={classes.deleteIcon} />
            Yes
          </button>
          <button className={classes.noBtn} onClick={noHandler}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDelete;
