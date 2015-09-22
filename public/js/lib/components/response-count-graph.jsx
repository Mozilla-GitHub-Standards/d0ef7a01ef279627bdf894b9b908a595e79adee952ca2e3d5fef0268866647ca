import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class ResponseCountGraph extends Component {

  static propTypes = {
    width: PropTypes.integer,
    height: PropTypes.integer,
    timeSlice: PropTypes.string.isRequired,
    title: PropTypes.string,
  }

  static defaultProps = {
    width: 580,
    height: 308,
    title: 'Untitled',
  }

  render() {
    var { timeSlice, ...graphConf } = this.props;

    var src = graphite.responseCountUrl({
      'from': timeSlice,
      ...graphConf,
    });
    var className = cx('graph');
    return (
      <img className={className} src={src}
        width={graphConf.width} height={graphConf.height} />
    );
  }

}
