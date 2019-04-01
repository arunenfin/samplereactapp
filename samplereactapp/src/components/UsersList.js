import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Table from './Table';
import { getUsers } from '../lib/utilities';
import { changeState } from '../lib/actions';
import { connect } from 'react-redux';
import '../assets/css/UsersList.css';
import Edit2 from 'react-feather/dist/icons/edit-2';
import { Link } from 'react-router-dom';

const IMAGEPATH = `${process.env.REACT_APP_API_URL}/uploads/`;

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
    const headerKeys = ['Id', 'Image', 'Name', 'Email', 'Status', 'Options'];
    const body = this.props.users.map((value, index) => {
      return (
        <tr key={index}>
          <td>{value.id}</td>
          <td><img src={IMAGEPATH + value.image} className='avatar' alt='Avatar' /></td>
          <td>{value.name}</td>
          <td>{value.email}</td>
          <td>{value.status === 1 ? <span className="badge badge-pill badge-success">Active</span> : <span className="badge badge-pill badge-danger">Inactive</span>}</td>
          <td><Link to={`/users/${value.id}`}><Edit2 className='feather' /></Link></td>
        </tr>
      )
    })

    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Navbar current="users" />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Users</h1>
            </div>
            <Table thead={headerKeys} tbody={body} />
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