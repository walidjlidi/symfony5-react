import React from 'react';
import { Route, Redirect } from 'react-router';
import AuthForm from 'components/AuthForm';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!AuthForm.isUserLoggedIn())
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
