import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class Graph extends Component {

  static propTypes = {
    // When this value changes, React will reload the images.
    getUrl: PropTypes.func.isRequired,
    graphProps: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    width: 580,
    height: 308,
  }

  render() {
    var graphProps = Object.assign({
      width: 580,
      height: 308,
    }, this.props.graphProps);

    graphProps.title = this.props.title;
    graphProps['from'] = graphProps.timeSlice;
    delete graphProps.timeSlice;

    var graphUrl = this.props.getUrl(graphProps);

    return (
      <img className={cx('graph')} width={graphProps.width}
        height={graphProps.height} src={graphUrl} />
    );
  }

}
