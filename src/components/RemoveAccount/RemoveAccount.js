import React, { useContext } from "react";
import classes from "./RemoveAccount.module.css";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AuthContext from "../../context/Authentication";
import { useNavigate } from "react-router-dom";

function RemoveAccount(props) {
  const { setAuth, setLastLogins } = useContext(AuthContext);
  const userID = props.removeAccount;

  const navigate = useNavigate();

  const onRemoveHandler = async () => {
    try {
      const response = await fetch(
        `https://api-generator.retool.com/gzCqMn/data/${userID}`,
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
      localStorage.removeItem("token");
      localStorage.removeItem("LastLogins");
      setAuth(null);
      setLastLogins([]);
      navigate("/");
    }
  };

  const onCancelHandler = () => {
    props.setRemoveAccount(null);
  };

  return (
    <div className={classes.main}>
      <h3 className={classes.title}>Do you want to remove your account ?</h3>
      <div className={classes.buttons}>
        <button onClick={onRemoveHandler}>
          <PersonRemoveIcon fontSize="small" className={classes.removeIcon} />
          Yes!
        </button>
        <button onClick={onCancelHandler}>No</button>
      </div>
    </div>
  );
}

export default RemoveAccount;
