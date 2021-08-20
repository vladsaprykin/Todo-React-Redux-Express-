import React, { useEffect } from 'react';
import Todo from './pages/Todo';
import Login from './pages/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import WindowAuth from './components/WindowAuth';
import { useDispatch, useSelector } from 'react-redux';
import { authUserThunkCreator } from './redux/actions';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authUserThunkCreator());
  }, []);
  return (
    <div className="App">
      {user.username.length > 0 && <WindowAuth />}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/todo">
          <Todo />
        </PrivateRoute>
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
