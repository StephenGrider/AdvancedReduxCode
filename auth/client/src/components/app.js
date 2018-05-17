import React from 'react';
import { Component } from 'react';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children} {/* has child routes to show*/}
      </div>
    );
  }
}
