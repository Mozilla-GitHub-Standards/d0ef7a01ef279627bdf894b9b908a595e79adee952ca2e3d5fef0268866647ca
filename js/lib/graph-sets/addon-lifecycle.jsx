import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';
import GraphHolder from 'lib/components/graph-holder';


export default class AddonLifecycle extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;
    graphProps.areaMode = 'stacked';
    //graphProps.lineMode = 'connected';

    return (
      <GraphHolder>
        <Graph title={gettext("All Add-on Status Changes")}
          getUrl={graphite.allAddonStatusChangesUrl} graphProps={graphProps} />
        <Graph title={gettext("Listed Add-on Status Changes")}
          getUrl={graphite.listedAddonStatusChangesUrl} graphProps={graphProps} />
        <Graph title={gettext("Unlisted Add-on Status Changes")}
          getUrl={graphite.unlistedAddonStatusChangesUrl} graphProps={graphProps} />
      </GraphHolder>
    );
  }
}
