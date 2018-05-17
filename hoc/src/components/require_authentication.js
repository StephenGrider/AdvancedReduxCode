import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) { // as a HOC export a function with a class and not just a class
  class Authentication extends Component {
    static contextTypes = { // you have to create a contextTypes to get access here at the context (that is like props but accessible from everywhere)
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) { // nextProps is a reference to the props when tehre's an update (life cicle method componentWillUpdate works so)
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} /> // the HOC will render the passed component to compose, that can use props as an usual one
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }

  return connect(mapStateToProps)(Authentication); // so 'connect' compose 'Authentication' that compose te passed component (so 2 nested HOC)
}
