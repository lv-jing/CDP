import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import routes from "./index";

const RouterFilter = () => {
  const history = useHistory();
  useEffect(() => {
    let noTokenPathList = routes.filter((x) => x.path && x.path !== "/").map((x) => x.path);
    if(noTokenPathList.includes(history.location.pathname)) {
      if (localStorage.getItem("token")) {
        history.push("/");
      } 
    } else {
      if(!localStorage.getItem("token")) {
        history.push("/login");
      }
    }
  }, [history]);
  return <></>;
};

export default withRouter(RouterFilter);
