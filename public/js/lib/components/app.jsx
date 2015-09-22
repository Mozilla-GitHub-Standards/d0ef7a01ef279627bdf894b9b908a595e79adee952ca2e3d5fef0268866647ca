import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'underscore';
import cx from 'classnames';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import * as appActions from 'lib/actions/app-actions'
import Error from 'lib/components/error';
import Grid from 'lib/components/grid';
import Graph from 'lib/components/graph';
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
      // This should match $grid-column-gutter from scss/inc/vars.scss
      const gutterWidth = 10;

      var columns = Math.round(this.props.app.panelSize.width / 700, 1);

      var graphWidth = Math.round(
        this.props.app.panelSize.width / columns, 1);
      // Adjust width for gutters in the columns.
      if (columns > 1) {
        graphWidth -= (columns -1) * gutterWidth;
      }
      console.log('grid columns:', columns, 'graphWidth:', graphWidth);

      var graphConf = {
        width: graphWidth,
        height: graphHeight,
        timeSlice: this.props.app.timeSlice,
      };
      var holderClass = cx('graph-holder');

      return (
        <Grid columns={columns}>
          <Graph kind="Response Count"
            getUrl={graphite.responseCountUrl} {...graphConf} />
          <Graph kind="Response Times"
            getUrl={graphite.responseTimesUrl} {...graphConf} />
          <Graph kind="Redirects and Errors"
            getUrl={graphite.redirectsAndErrorsUrl} {...graphConf} />
          <Graph kind="% of Auth'd Responses"
            getUrl={graphite.authResponseCountUrl} {...graphConf} />
        </Grid>
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
