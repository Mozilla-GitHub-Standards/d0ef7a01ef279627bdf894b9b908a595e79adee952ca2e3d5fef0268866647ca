import React, { Component, PropTypes } from 'react';

import { gettext } from 'lib/utils';
import * as graphite from 'lib/utils/graphite';
import Graph from 'lib/components/graph';


export default class ValidatorPerf extends Component {

  static propTypes = {
    graphProps: PropTypes.object.isRequired,
  }

  render() {
    var graphProps = this.props.graphProps;

    return (
      <div>
        <Graph title={gettext("Add-on Validation Times")}
          getUrl={graphite.addonValidationTimesUrl} graphProps={graphProps} />
      </div>
    );
  }
}
