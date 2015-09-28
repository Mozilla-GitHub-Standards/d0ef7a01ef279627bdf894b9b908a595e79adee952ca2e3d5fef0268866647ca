import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';
import GraphHolder from 'lib/components/graph-holder';


export default class SearchPerformance extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;
    return (
      <GraphHolder>
        <Graph title={gettext("Search Times")}
          getUrl={graphite.searchTimesUrl} graphProps={graphProps} />
      </GraphHolder>
    );
  }
}
