import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import { changeState } from '../lib/actions';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { updateUser } from '../lib/utilities';
import * as Yup from 'yup';

const IMAGEPATH = `${process.env.REACT_APP_API_URL}/uploads/`;

const UserEditSchema = Yup.object().shape({
  id: Yup.number()
    .required()
    .positive()
    .integer(),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
  email: Yup.string()
    .email('Invalid email')
    .required(),
  status: Yup.number()
    .required()
    .oneOf([1, 0]),
  image: Yup.string(),
});

class UserEdit extends Component {

  state = {
    selectedUser: {
      id: 0,
      name: '',
      email: '',
      status: 1,
      image: ''
    }
  };

  componentDidMount() {
    let { id } = this.props.match.params;
    if (id) {
      id = parseInt(id);
      const selectedUser = this.props.users.find(n => n.id === id);
      this.setState({ selectedUser });
    }
  }

  _renderForm = ({ errors, status, touched, isSubmitting }) => (
    <Form>
      <img src={IMAGEPATH + this.state.selectedUser.image} width='200' className="rounded mx-auto d-block" alt="Avatar" />
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Name</label>
        <Field type="text" className="form-control" name="name" />
        <ErrorMessage name="name" component="div" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput2">Email address</label>
        <Field type="email" className="form-control" name="email" />
        <ErrorMessage name="email" component="div" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Status</label>
        <Field className="form-control" component="select" name="status">
          <option value='1'>Active</option>
          <option value='0'>Inactive</option>
        </Field>
        <ErrorMessage name="status" component="div" />
      </div>
      <div className="form-group">
        {status && status.msg && <div>{status.msg}</div>}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
      </div>
    </Form>
  )

  _handleSubmit = async (values, actions) => {
    try {
      const result = await updateUser(values);
      if(result.success) {
        actions.setStatus({ msg: 'Successfully Updated!' });
      } else {
        actions.setStatus({ msg: 'Updation Failed!' });
      }
    } catch(e) { 
      actions.setStatus({ msg: 'Updation Failed!' });
    }
    actions.setSubmitting(false);
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <Navbar current="users" />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Edit User</h1>
            </div>
            <Formik 
              enableReinitialize 
              initialValues={this.state.selectedUser} 
              validationSchema={UserEditSchema} 
              onSubmit={this._handleSubmit} 
              render={this._renderForm} />
          </main>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.users }
}

export default connect(mapStateToProps, { changeState })(UserEdit);