import React from 'react';
import Todo from './pages/Todo';
import Login from './pages/Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import WindowAuth from './components/WindowAuth';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/todo">
          <WindowAuth />
          <Todo />
        </PrivateRoute>
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
