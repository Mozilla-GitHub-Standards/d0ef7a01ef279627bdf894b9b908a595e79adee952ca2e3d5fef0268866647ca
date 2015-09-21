import React, { Component } from 'react';

import * as graphite from 'lib/utils/graphite';


export default class ResponseCountGraph extends Component {

  render() {
    var width = 580;
    var height = 308;
    var src = graphite.responseCountUrl({width: width, height: height});
    return <img src={src} width={width} height={height} />;
  }

}
