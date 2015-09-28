import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';
import GraphHolder from 'lib/components/graph-holder';


export default class SitePerf extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;
    return (
      <GraphHolder>
        <Graph title={gettext("Response Times")}
          getUrl={graphite.responseTimesUrl} graphProps={graphProps} />
        <Graph title={gettext("Response Count")}
          getUrl={graphite.responseCountUrl} graphProps={graphProps} />
        <Graph title={gettext("Redirects and Errors")}
          getUrl={graphite.redirectsAndErrorsUrl} graphProps={graphProps} />
      </GraphHolder>
    );
  }
}
