import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class Graph extends Component {

  static propTypes = {
    // When this value changes, React will reload the images.
    getUrl: PropTypes.func.isRequired,
    graphProps: PropTypes.object.isRequired,
    height: PropTypes.number,
    title: PropTypes.string.isRequired,
    width: PropTypes.number,
  }

  static defaultProps = {
    width: 500,
    height: 300,
  }

  render() {
    var graphProps = Object.assign({}, this.props.graphProps);

    graphProps.width = this.props.width;
    graphProps.height = this.props.height;
    graphProps.title = this.props.title;

    var graphUrl = this.props.getUrl(graphProps);

    return (
      <img className={cx('graph')} width={graphProps.width}
        height={graphProps.height} src={graphUrl} />
    );
  }

}
