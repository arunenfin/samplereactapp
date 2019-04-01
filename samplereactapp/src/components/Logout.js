import React from 'react';
import { Redirect } from 'react-router-dom';
import { resetState } from '../lib/actions';
import { connect } from 'react-redux';

function Logout(props) {
  localStorage.removeItem('token');
  props.resetState();

  return <Redirect to='/' />
}

export default connect(null, { resetState })(Logout);