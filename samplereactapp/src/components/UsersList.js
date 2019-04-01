import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Table from './Table';
import { getUsers } from '../lib/utilities';
import { changeState } from '../lib/actions';
import { connect } from 'react-redux';
import '../assets/css/UsersList.css';

class UsersList extends Component {

  async componentDidMount() {
    try {
      const result = await getUsers();
      if (result.success) {
        const { users } = result;
        this.props.changeState({ users });
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Navbar current="users" />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Users</h1>
            </div>
            <Table users={this.props.users} />
          </main>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.users }
}

export default connect(mapStateToProps, { changeState })(UsersList);