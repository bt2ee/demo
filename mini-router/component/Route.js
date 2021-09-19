import React from 'react';
import { useContext } from "react";
import { matchPath } from "react-router";
import { RouterContext } from "./Router";

function Route(props) {
  const context = useContext(RouterContext);
  const location = props.location || context.location;
  const match = props.computedMatch
    ? props.computedMatch
    : props.path
    ? matchPath(location.pathname, props)
    : context.match;
  const newRouterProps = { ...context, location, match };
  let { children, component, render } = props;
  if (Array.isArray(children) && children.length === 0) children = null;
  let renderChildren = null;
  if (newRouterProps.match) {
    if (children) {
      renderChildren =
        typeof children === "function" ? children(newRouterProps) : children;
    } else if (component) {
      renderChildren = React.createElement(component, newRouterProps);
    } else if (render) {
      renderChildren = render(newRouterProps);
    }
  }
  return (
    <RouterContext.Provider value={newRouterProps}>
      {renderChildren}
    </RouterContext.Provider>
  );
}

export default Route;
