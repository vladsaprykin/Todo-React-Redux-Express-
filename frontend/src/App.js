import React, { useState } from 'react';
import Todo from './pages/Todo';
import Login from './pages/Login';
import {
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'
import { useSelector } from "react-redux";

function App(props) {
	const isAuthenticated = useSelector((state) => state.user.authenticated);
	return (
		<div className='App'>
			<Switch>
				<Route history={props.history} path='/login' component={Login}/>
				<Route
					history={props.history}
					path='/todo'
					render={() => isAuthenticated ? <Todo/> : <Redirect to="/login"/>
					}
				/>
				<Redirect from='/' to='/login'/>
			</Switch>
		</div>
	);
}

export default App;
