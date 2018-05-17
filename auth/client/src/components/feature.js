import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
//import RequireAuth from './auth/require_auth'; ALT V  just in case we want to use the HOC here

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature); 
// ALT V  just in case we wanna use HOC here not in the route, wrap like this RequireAuth(Feature)
