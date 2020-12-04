import React from "react";
import { Redirect } from "react-router-dom";

export default function Note(props) {
  return (
    <>
      {parseInt(props.match.params.id) ? (
        <div>
          <h1>Note no {props.match.params.id}</h1>
        </div>
      ) : (
        <Redirect to="/pagenotfound" />
      )}
    </>
  );
}
