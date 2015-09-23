import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class Graph extends Component {

  static propTypes = {
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
    var { timeSlice, ...graphConf } = this.props;

    var graphUrl = this.props.getUrl({
      'from': timeSlice,
      ...graphConf,
    });

    return (
      <img className={cx('graph')} src={graphUrl}
        width={graphConf.width} height={graphConf.height} />
    );
  }

}
