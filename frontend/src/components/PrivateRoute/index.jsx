import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/user/action';

function PrivateRoute({ children, ...rest }) {
  const { authenticated, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authenticated) dispatch(getUser());
  }, []);
  if (isLoading)
    return (
      <Route {...rest}>
        {' '}
        <div>loading</div>{' '}
      </Route>
    );
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoading ? (
          authenticated && !isLoading ? (
            children
          ) : (
            <>
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            </>
          )
        ) : (
          <div>loading</div>
        )
      }
    />
  );
}
export default PrivateRoute;
