import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { compose, createStore } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux"
import {  BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const store = createStore(rootReducer, compose(
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
));
const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<React.StrictMode>
				<Route path="/" component={App} />

			</React.StrictMode>
		</Router>
	</Provider>,
	document.getElementById('root'),
);
