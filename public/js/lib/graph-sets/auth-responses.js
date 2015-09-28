import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';
import GraphHolder from 'lib/components/graph-holder';


export default class AuthResponses extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;
    return (
      <GraphHolder>
        <Graph title={gettext("% of Auth'd Responses")}
          getUrl={graphite.authResponseCountUrl} graphProps={graphProps} />
      </GraphHolder>
    );
  }
}
