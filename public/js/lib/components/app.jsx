import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from 'lib/actions/app-actions'
import Error from 'lib/components/error';
import ResponseCountGraph from 'lib/components/response-count-graph';


export class App extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.boundAppActions = bindActionCreators(appActions, props.dispatch);
    this.boundAppActions.checkForGraphite()
  }

  render() {
    if (this.props.app.error) {
      return <Error message={this.props.app.error} />;
    } else {
      return (
        <div>
          <ResponseCountGraph />
        </div>
      );
    }
  }
}


function select(state) {
  return {
    app: state.app,
  };
}


export default connect(select)(App);
