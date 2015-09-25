import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';


export default class SearchPerformance extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;
    return (
      <div>
        <Graph title={gettext("Search Times")}
          getUrl={graphite.searchTimesUrl} graphProps={graphProps} />
      </div>
    );
  }
}
