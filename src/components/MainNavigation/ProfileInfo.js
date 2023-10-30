import React, { useContext, useEffect, useState } from "react";
import classes from "./ProfileInfo.module.css";
import { useDispatch } from "react-redux";
import { ProfileAction } from "../../store/profileInfo-slice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../../context/Authentication";
import PersonIcon from "@mui/icons-material/Person";

function ProfileInfo() {
  // FIXME
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const closeHandler = () => {
    dispatch(ProfileAction.closeProfile());
  };

  const logoutHandler = () => {
    setAuth(null);
    localStorage.removeItem("token");
    dispatch(ProfileAction.closeProfile());
    navigate("/login");
  };

  useEffect(() => {
    // setLoading(true);
    const asyncFunc = async () => {
      try {
        const response = await fetch(
          "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json"
        );
        const resData = await response.json();
        let dataArr = [];
        for (const key in resData) {
          dataArr.push({
            id: key.toString(),
            ...resData[key],
          });
        }
        const userSelf = dataArr.find((user) => user.token.toString() === auth);
        setUser(userSelf);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };
    asyncFunc();
  }, [auth]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {/* FIXME */}
        <div>
          {user?.pp ? (
            <img src={user?.pp} alt="pp" className={classes.pp} />
          ) : (
            <PersonIcon fontSize="large" className={classes.profilePhoto} />
          )}
        </div>

        <h4 className={classes.name}>
          {user?.firstName} {user?.lastName}
        </h4>
        <h4 className={classes.nickname}>@{user?.nickName}</h4>
        <button onClick={logoutHandler} className={classes.logoutButton}>
          <span>Logout </span>
          <LogoutIcon />
        </button>
        <button className={classes.closeButton} onClick={closeHandler}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
