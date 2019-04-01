import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import UsersList from './components/UsersList';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import jwtDecode from 'jwt-decode';
import { changeState } from './lib/actions';
import { connect } from 'react-redux';

const TOKEN = localStorage.getItem('token');
class App extends Component {
  
  componentDidMount() {
    if(TOKEN) {
      const user = jwtDecode(TOKEN);
      this.props.changeState({ user, isLoggedIn: true });
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/dashboard' component={Dashboard} />
          <ProtectedRoute path='/users' component={UsersList} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { changeState })(App);
