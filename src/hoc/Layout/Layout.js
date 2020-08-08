import React, { useState } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const closeSideDrawerHandler = () => {
    setShowSideDrawer(false);
  };

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Aux>
      <Toolbar toggled={toggleSideDrawerHandler} />
      <SideDrawer open={showSideDrawer} closed={closeSideDrawerHandler} />
      {/* <div>Toolbar,SideDrawer,Backdrop</div> */}
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
