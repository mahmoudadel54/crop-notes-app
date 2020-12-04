import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (localStorage.getItem("email") &&
          localStorage.getItem("email") !== "") ||
          currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}

export function PrivateRouteIfLogged({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (localStorage.getItem("email") &&
          localStorage.getItem("email") !== "") ||
          currentUser ? (
          
          <Redirect to="/notelist" />
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
  );
}
