import React from "react";

export default function PageNotFound(props) {
  return <h1>The URL {props.location.pathname} was not found.</h1>;
}
