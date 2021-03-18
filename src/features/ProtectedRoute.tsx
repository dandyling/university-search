import React, { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../App";

interface Props {
  path: string;
  children: ReactNode;
}

const ProtectedRoute = (props: Props) => {
  const user = useRecoilValue(userState);
  if (!user) {
    return <Redirect to={"/signin"}></Redirect>;
  } else {
    return (
      <Route exact path={props.path}>
        {props.children}
      </Route>
    );
  }
};

export default ProtectedRoute;
