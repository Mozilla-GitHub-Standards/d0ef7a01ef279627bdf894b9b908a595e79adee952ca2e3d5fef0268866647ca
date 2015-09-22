import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'underscore';

import { gettext } from 'lib/utils';
import * as appActions from 'lib/actions/app-actions'
import Error from 'lib/components/error';
import ResponseCountGraph from 'lib/components/response-count-graph';
import Spinner from 'lib/components/spinner';


export class App extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    window: PropTypes.object,
  }

  static defaultProps = {
    window: window,
  }

  constructor(props) {
    super(props);
    this.boundAppActions = bindActionCreators(appActions, props.dispatch);
    this.boundAppActions.checkForGraphite()
    this.setWindowSize();
    window.onresize = debounce(this.setWindowSize, 300);
  }

  setWindowSize = () => {
    this.boundAppActions.setWindowSize({
      width: this.props.window.innerWidth,
      height: this.props.window.innerHeight,
    });
  }

  render() {
    if (this.props.app.error) {
      return <Error message={this.props.app.error} />;
    } else if (!this.props.app.panelSize.width) {
      return <Spinner text={gettext('Loading some hot graphs')} />;
    } else {
      const graphHeight = 300;
      var graphWidth = this.props.app.panelSize.width;
      if (this.props.app.panelSize.width > 1000) {
        graphWidth = Math.round(graphWidth / 2, 1);
      }
      return (
        <div>
          <ResponseCountGraph width={graphWidth} height={graphHeight} />
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
