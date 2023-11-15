import React, { useState } from "react";
import classes from "./PostDelete.module.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function PostDelete(props) {
  console.log(props);
  const postId = props.removing;
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();

  const yesHandler = async () => {
    setRemoving(true);
    try {
      const resposne = await fetch(
        `https://retoolapi.dev/d2cIkX/posts/${postId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: null,
        }
      );
      const resData = await resposne.json();
      console.log(resData);
      navigate("/myprofile");
    } catch (error) {
      console.log(error);
    } finally {
      props.setPost((prev) => prev.filter((item) => item?.id !== postId));
      setRemoving(false);
      props.setRemoving(null);
    }
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
            {!removing && (
              <DeleteIcon fontSize="small" className={classes.deleteIcon} />
            )}
            {removing ? <div className={classes.spinner}></div> : "Yes"}
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
