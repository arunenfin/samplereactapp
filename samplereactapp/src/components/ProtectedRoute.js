import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
  if(props.isLoggedIn) {
    return <Route {...props} />;
  }

  return <Redirect to='/' />
}

function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps)(ProtectedRoute);