import React, { Component } from 'react';
import { reduxForm } from 'redux-form';// import the HOC from redux-form
import * as actions from '../../actions';//import actions creators

class Signin extends Component {
    
  componentWillMount() {// clear the server err for every back and forth to the page for renderAlert()
    this.props.authError('');
  }
    
renderAlert() { // show up the err msg if it exists [funct called in render..]
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
    
  handleFormSubmit({ email, password }) {//callback #1
    // Need to do something to log user in
    this.props.signinUser({ email, password });//call the action creator
  }

  

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;//hooks up handleSubmit (method from redux-form to the fields)

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}> {/*hooks up handleSubmit to the callback #1*/}
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);//hooks up the actions creators
