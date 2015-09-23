import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class Graph extends Component {

  static propTypes = {
    // When this value changes, React will reload the images.
    nonce: PropTypes.string.isRequired,
    getUrl: PropTypes.func.isRequired,
    width: PropTypes.integer,
    height: PropTypes.integer,
    timeSlice: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    width: 580,
    height: 308,
  }

  render() {
    var { width, height, title, ...props } = this.props;

    var graphUrl = this.props.getUrl({
      'from': props.timeSlice,
      width: width,
      height: height,
      title: title,
      // Maybe there is a better way to do this? Without a new URL,
      // React won't let the image reload. In other words: it would be
      // better to rely on the browser cache rather than this.
      _nonce: props.nonce,
    });

    return (
      <img className={cx('graph')} width={width} height={height}
        src={graphUrl} />
    );
  }

}
