import React from "react";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import { Outlet } from "react-router-dom";
import SideBarOpened from "../../components/SideBar/SideBarOpened";
import SideBarClosed from "../../components/SideBar/SideBarClosed";

function MainRoot() {
  return (
    <div>
      <MainNavigation />
      <hr />
      <Outlet />
      <hr />
      <SideBarOpened />
      <hr />
      <SideBarClosed />
    </div>
  );
}

export default MainRoot;
