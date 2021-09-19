import React, { useContext } from "react";
import { matchPath } from "react-router";
import { RouterContext } from "./Router";

export default function Switch(props) {
  const context = useContext(RouterContext);
  const location = props.location || context.location;
  let children, match;
  React.Children.forEach(props.children, (child) => {
    if (!match && React.isValidElement(child)) {
      const path = child.props.path;
      children = child;
      match = path
        ? matchPath(location.pathname, { ...child.props })
        : context.match;
    }
  });
  return match
    ? React.cloneElement(children, { location, computedMatch: match })
    : null;
}
