import React, { Component } from 'react';
import '../assets/css/Login.css';
import { authenticate } from '../lib/utilities';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { changeState } from '../lib/actions';
import { Redirect } from 'react-router-dom';

class Login extends Component {

  state = { email: '', password: '' }

  componentDidMount() {
    document.body.classList.add('body-color');
  }

  componentWillUnmount() {
    document.body.classList.remove('body-color');
  }

  _handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  _handleSubmit = async event => {
    try {
      event.preventDefault();
      const { email, password } = this.state;
      const result = await authenticate({ email, password });
      if(result.success) {
        localStorage.setItem('token', result.token);
        const user = jwtDecode(result.token);
        this.props.changeState({ user, isLoggedIn: true });
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    if(this.props.isLoggedIn) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="container">
        <form className="form-signin" onSubmit={this._handleSubmit}>
          <div className="text-center mb-4">
            <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Floating labels</h1>
            <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
          </div>

          <div className="form-label-group">
            <input type="email" id="inputEmail" name="email" onChange={this._handleChange} className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputEmail">Email address</label>
          </div>

          <div className="form-label-group">
            <input type="password" id="inputPassword" name="password" onChange={this._handleChange} className="form-control" placeholder="Password" required />
            <label htmlFor="inputPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
          </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2019</p>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps, { changeState })(Login);