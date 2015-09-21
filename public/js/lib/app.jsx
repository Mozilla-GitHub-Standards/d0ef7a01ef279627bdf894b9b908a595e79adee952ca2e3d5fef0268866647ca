import React, { Component } from 'react';
import { connect } from 'react-redux';


export class App extends Component {
  render() {
    return (
      <div>This is a rendered app</div>
    );
  }
}


function select(state) {
  return {
    app: state.app,
  };
}


export default connect(select)(App);
