import React from "react";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import { Link, Outlet } from "react-router-dom";
import SideBarOpened from "../../components/SideBar/SideBarOpened";
// import SideBarClosed from "../../components/SideBar/SideBarClosed";
import classes from "./MainRoot.module.css";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

function MainRoot() {
  const sidebar = useSelector((state) => state.sidebar.sidebar);

  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <MainNavigation />
      </div>
      <div className={classes.mainContent}>
        <div className={classes.content}>
          <Outlet />
        </div>
        {/* <hr /> */}
        {/* <SideBarClosed /> */}
      </div>
      <Link to="/addplace" className={classes.addIcon}>
        <AddIcon />
      </Link>
      {sidebar && (
        <div className={classes.sideOpen}>
          <SideBarOpened />
        </div>
      )}
    </div>
  );
}

export default MainRoot;
