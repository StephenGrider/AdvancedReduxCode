import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

  //helper comp function, split strings when needed (to have the right string output from the field name in the loop)
    function splitString(initialtext) {
        let regex1 = RegExp(/(?=[A-Z])/); //has cap letter in
        let are2words = regex1.test(initialtext); // check if true
        let result= are2words ? initialtext.split(/(?=[A-Z])/).join(" ") : initialtext;
        //console.log(initialtext, are2words);
        return result
    }

class Signup extends Component {
    
  componentWillMount() {// clear the server err for every back and forth to the page for renderAlert()
    this.props.authError('');
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
    
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }
    
    
    
  // comp optimization
    renderFieldsets(fieldlist){
                
        let fieldsetArr = Object.values(fieldlist).map(fieldobj => (
        <fieldset className="form-group" key={fieldobj.name}>
          <label className='captext'>{splitString(fieldobj.name)}</label>
          <input className="form-control" {...fieldobj} type={fieldobj.name === 'password' || fieldobj.name === 'passwordConfirm' ? 'password' : ''} />
          {fieldobj.touched && fieldobj.error && <div className="error">{fieldobj.error}</div>}
        </fieldset>
        ));
        return fieldsetArr;
    }

    
  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {/* keeping this for didactic purpose
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>} //if 2&&== true - return the last vale of the && seq [js trick]
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>} //manage 2 type of err with 1 block
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>} 
        </fieldset>*/}
        {this.renderFieldsets(this.props.fields)}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {// the arg is provided by HOC redux-form [and is a obj of the fields-value]
  const errors = {};
    
    //console.log(formProps);
    
    /* keeping this for didactic purpose
    if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }*/
    
    //my compressed approach of the above 
    Object.keys(formProps).map(field => 
        { 
            if (!formProps[field]) {
                //errors[field] = 'Please enter ' + (field === 'email' ? 'an ' : 'a ') + field;
                errors[field] = `Please enter ${(field === 'email' ? 'an ' : 'a ') + splitString(field)}`;
              }
        }
    )


  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
