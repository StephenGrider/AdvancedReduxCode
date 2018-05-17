import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class 
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument( // this testutil method create the component ready to be use in a DOM later [complete also with state and props passed by the main funct 'renderComponent']
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML [in the specified DOM, in this case that one created by jsdom and warpped in jquery]
}

// Build helper for simulating events
$.fn.simulate = function(eventName, value) { //$.fn. creates a new jquery method for our jquery instance
  if (value) {
    this.val(value);// this is the jquery obj and the jq method .val(value) sets the value passed, nothing new here
  }
  TestUtils.Simulate[eventName](this[0]); // refer to react-addons-test-utils doc to undurstend this [react doc - addons - testutil]
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $); // chaijq set up function, see doc if you want

export { renderComponent, expect };
