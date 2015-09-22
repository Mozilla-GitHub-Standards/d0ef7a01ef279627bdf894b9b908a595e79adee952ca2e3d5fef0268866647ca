import React, { Component, PropTypes } from 'react';

import * as graphite from 'lib/utils/graphite';


export default class ResponseCountGraph extends Component {

  static propTypes = {
    width: PropTypes.integer,
    height: PropTypes.integer,
  }

  static defaultProps = {
    width: 580,
    height: 308,
  }

  render() {
    var src = graphite.responseCountUrl({
      width: this.props.width,
      height: this.props.height,
    });
    return (
      <img src={src} width={this.props.width}
        height={this.props.height} />
    );
  }

}
