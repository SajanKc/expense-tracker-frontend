import React from "react";
import Home from "./components/Home";
import Category from "./components/Category";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Expenses from "./components/Expenses";
import AppNavbar from "./components/AppNavbar";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
	return (
		<Router>
			<AppNavbar />
			<Switch>
				<Route path="/" exact={true} component={Home} />
				<Route path="/categories" exact={true} component={Category} />
				<Route path="/expenses" exact={true} component={Expenses} />
			</Switch>
		</Router>
	);
};

export default App;
