import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class Graph extends Component {

  static propTypes = {
    getUrl: PropTypes.func.isRequired,
    kind: PropTypes.string.isRequired,
    width: PropTypes.integer,
    height: PropTypes.integer,
    timeSlice: PropTypes.string.isRequired,
  }

  static defaultProps = {
    width: 580,
    height: 308,
  }

  render() {
    var { timeSlice, kind, ...graphConf } = this.props;
    var title = kind + ': ' + graphite.timeSliceTitles[timeSlice];

    var graphUrl = this.props.getUrl({
      'from': timeSlice,
      title: title,
      ...graphConf,
    });

    return (
      <img className={cx('graph')} src={graphUrl}
        width={graphConf.width} height={graphConf.height} />
    );
  }

}
