import React, { Component } from 'react';
import { reduxForm,Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

const renderInput=field=>{
  const {meta: {touched,error}}=field;
  return(
    <div>
      <input {...field.input} type={field.type} className="form-control" />
      <div className="error">{touched?error:''}</div>
    </div>
    );  
  
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit}=this.props;
    
    return(
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field
              name="email"
              component={renderInput}
              type="email"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <Field
              name="password"
              component={renderInput}
              type="password"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <Field
              name="passwordConfirm"
              component={renderInput}
              type="password"
            />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign Up</button>
        </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps,actions)(Signup)
);