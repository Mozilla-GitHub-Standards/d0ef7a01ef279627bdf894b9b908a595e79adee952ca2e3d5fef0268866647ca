import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'underscore';
import cx from 'classnames';

import { addVisibilityHandler, gettext } from 'lib/utils';
import { getGraphSet } from 'lib/constants/graph-sets';
import * as graphite from 'lib/utils/graphite';
import * as appActions from 'lib/actions/app-actions'
import Error from 'lib/components/error';
import Graph from 'lib/components/graph';
import Navigation from 'lib/components/navigation';
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

    if (props.app.autoUpdateInterval) {
      this.boundAppActions.startReloadingGraphs();
    }

    this.boundAppActions.checkForGraphite()
    this.setPanelSize();
    window.onresize = debounce(this.setPanelSize, 300);

    addVisibilityHandler(isVisible => {
      if (this.props.app.autoUpdateInterval) {
        if (isVisible) {
          this.boundAppActions.reloadGraphImages();  // initial reload
          this.boundAppActions.resumeGraphReloading();  // interval
        } else {
          this.boundAppActions.pauseGraphReloading();
        }
      }
    });
  }

  setPanelSize = () => {
    var win = this.props.window;
    var width;

    if (win.clientWidth) {
      console.log('setting panel size from clientWidth');
      width = win.clientWidth;
    } else {
      var hasVScroll;
      var cStyle = (document.body.currentStyle ||
                    window.getComputedStyle(document.body, ""));

      if (cStyle) {
        // Check the overflow and overflowY properties
        // for "auto" and "visible" values
        hasVScroll = cStyle.overflow == "visible"
                     || cStyle.overflowY == "visible"
                     || (hasVScroll && cStyle.overflow == "auto")
                     || (hasVScroll && cStyle.overflowY == "auto");
      }
      console.log('guessing inner width from CSS padding; innerWidth:',
                  win.innerWidth);
      var horizontalMargin = 40;  // matches padding * 2 from _base.scss
      width = (win.innerWidth - horizontalMargin)
      if (hasVScroll) {
        console.log('adjusting width for scollbars');
        width = width - 15;
      }
    }

    this.boundAppActions.setPanelSize({
      width: width,
      height: win.clientHeight || win.innerHeight,
    });
  }

  render() {
    if (this.props.app.error) {
      return <Error message={this.props.app.error} />;
    } else if (!this.props.app.panelSize.width) {
      return <Spinner text={gettext('Loading some hot graphs')} />;
    } else {
      var graphHeight = this.props.app.graphHeight;
      // Make a guess at how many columns they may want to see.
      // TODO: make this configurable.
      var columns = Math.round(this.props.app.panelSize.width / 700, 1);
      var graphWidth = Math.floor(this.props.app.panelSize.width / columns);
      console.log('grid columns:', columns,
                  'panel width:', this.props.app.panelSize.width,
                  'graph width:', graphWidth);

      var graphProps = {
        width: graphWidth,
        height: graphHeight,
        timeSlice: this.props.app.timeSlice,
        lineMode: 'connected',
        // Maybe there is a better way to do this? Without a new URL,
        // React won't let the image reload. In other words: it would be
        // better to rely on the browser cache rather than this.
        _nonce: this.props.app.graphImageNonce,
      };

      var conf = getGraphSet(this.props.app.graphSet);
      if (!conf) {
        return (
          <Error
            message={'unknown graph set: ' + this.props.app.graphSet}/>
        );
      }
      var GraphSet = conf.component;

      return (
        <div>
          <Navigation
            autoUpdateInterval={this.props.app.autoUpdateInterval}
            currentTimeSlice={this.props.app.timeSlice}
            currentGraphSet={this.props.app.graphSet}
            {...this.boundAppActions}
          />
          <GraphSet graphProps={graphProps} />
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
