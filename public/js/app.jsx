import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return <div>This is a rendered app</div>;
  }
}

React.render(<App/>, document.getElementById('app'));
