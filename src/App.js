import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/css/App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

import NavBar from './components/layout/NavBar';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

//States
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<>
							<NavBar />
							<div className='container'>
								<Alerts />
								<Switch>
									<PrivateRoute exact path='/' component={Home} />
									<Route exact path='/about' component={About} />
									<Route exact path='/register' component={Register} />
									<Route exact path='/login' component={Login} />
									<Route component={NotFound} />
								</Switch>
							</div>
						</>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
