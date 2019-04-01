import React from 'react';
import { Link } from 'react-router-dom';
import Home from 'react-feather/dist/icons/home';
import Users from 'react-feather/dist/icons/users';

const Navbar = (props) => {

  const inactive = "nav-link";
  const active = "nav-link active";

  const classes = {
    dashboard: inactive,
    users: inactive,
  };

  switch(props.current) {
    case 'dashboard': 
      classes.dashboard = active;
      break;
    case 'users': 
      classes.users = active;
      break;
    default:
  }

  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className={classes.dashboard} to="/dashboard">
              <Home className="feather" />
              Dashboard 
            </Link>
          </li>
          <li className="nav-item">
            <Link className={classes.users} to="/users">
              <Users className="feather" />
              Users
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar;