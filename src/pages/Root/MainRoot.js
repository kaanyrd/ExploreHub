import React, { useContext } from "react";
import ReactDOM from "react-dom";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import { Link, Outlet } from "react-router-dom";
import SideBarOpened from "../../components/SideBar/SideBarOpened";
import classes from "./MainRoot.module.css";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../../components/Footer/Footer";
import Scroll from "../../components/Scroll/Scroll";
import LeftSideBar from "../../components/SideBar/LeftSideBar";
import AuthContext from "../../context/Authentication";

function MainRoot() {
  const sidebar = useSelector((state) => state.sidebar.sidebar);
  const { auth } = useContext(AuthContext);

  const SideBar = () => {
    return <SideBarOpened />;
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainLeft}>
        <LeftSideBar />
      </div>
      <div className={classes.mainRight}>
        <div className={classes.navbar}>
          <MainNavigation />
        </div>
        <div className={classes.mainContent}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
      {auth && (
        <Link to="/addplace" className={classes.addIcon}>
          <AddIcon />
        </Link>
      )}
      {sidebar &&
        ReactDOM.createPortal(<SideBar />, document.getElementById("sidebar"))}
      <Scroll />{" "}
    </div>
  );
}

export default MainRoot;
