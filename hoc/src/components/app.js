import React from 'react';
import { Component } from 'react';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children} {/* this coz the route of "resorces" component is called as child-route in the "App" component */}
      </div>
    );
  }
}
