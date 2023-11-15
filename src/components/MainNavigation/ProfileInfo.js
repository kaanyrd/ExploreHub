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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { setAuth, lastLogins } = useContext(AuthContext);
  let userID = lastLogins?.id.toString();

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
    setLoading(true);
    const asyncFunc = async () => {
      try {
        const response = await fetch(
          `https://retoolapi.dev/Brjzmm/users/${userID}`
        );
        const resData = await response.json();
        setUser(resData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    asyncFunc();
  }, [userID]);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        {loading ? (
          <div className={classes.loadingSpinner}></div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
