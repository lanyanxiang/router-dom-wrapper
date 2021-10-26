import React, { FunctionComponent } from "react";
import { RouteEntry } from "../types";
import { useRouteMatch } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

interface Props {
  route: RouteEntry;
}

const RouteWithSubRoutes: FunctionComponent<Props> = ({ route }) => {
  const { Component, permissions, redirect, children, ...otherRouteProps } =
    route;
  const { path: parentPath } = useRouteMatch();

  const childrenToRender = children?.map((route) => {
    if (!route.permissions) {
      // Allow permission inheritance.
      route.permissions = permissions;
      // Allow children route to use relative path.
      route.path = `${parentPath}${route.path}`;
    }
    return route;
  });

  if (permissions) {
    return (
      <ProtectedRoute
        permissions={permissions}
        redirect={redirect}
        {...otherRouteProps}
      >
        <Component routes={childrenToRender} />
      </ProtectedRoute>
    );
  } else {
    return (
      <PublicRoute {...otherRouteProps}>
        <Component routes={childrenToRender} />
      </PublicRoute>
    );
  }
};

export { RouteWithSubRoutes };