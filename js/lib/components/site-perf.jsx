import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';


export default class SitePerf extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;
    return (
      <div>
        <Graph title={gettext("Response Count")}
          getUrl={graphite.responseCountUrl} {...graphProps} />
        <Graph title={gettext("Response Times")}
          getUrl={graphite.responseTimesUrl} {...graphProps} />
        <Graph title={gettext("Search Times")}
          getUrl={graphite.searchTimesUrl} {...graphProps} />
        <Graph title={gettext("Redirects and Errors")}
          getUrl={graphite.redirectsAndErrorsUrl} {...graphProps} />
      </div>
    );
  }
}
