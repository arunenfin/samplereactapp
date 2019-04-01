import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import '../assets/css/Dashboard.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Navbar current="dashboard" />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default Dashboard;