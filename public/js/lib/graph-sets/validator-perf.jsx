import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';
import GraphHolder from 'lib/components/graph-holder';


export default class ValidatorPerf extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;

    return (
      <GraphHolder>
        <Graph title={gettext("Add-on Validation Times")}
          getUrl={graphite.addonValidationTimesUrl} graphProps={graphProps} />
        <Graph title={gettext("Add-on Validation Count")}
          getUrl={graphite.addonValidationCountUrl} graphProps={graphProps} />
        <Graph title={gettext("Unlisted Auto-signable Validation Count")}
          getUrl={graphite.autoSignableAddonCountUrl} graphProps={graphProps} />
      </GraphHolder>
    );
  }
}
