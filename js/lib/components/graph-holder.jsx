import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export class GraphHolder extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  renderGraphs() {
    var childrenCount = React.Children.count(this.props.children);
    var graphHeight = this.props.app.graphHeight;

    // Make a guess at how many columns they may want to see.
    // TODO: make this configurable as well.
    var columns = Math.round(this.props.app.panelSize.width / 700, 1);
    if (columns > childrenCount) {
      // This will stretch the number of children to fit in cases where there
      // are only a few graphs.
      columns = childrenCount;
    }
    var graphWidth = Math.floor(this.props.app.panelSize.width / columns);

    console.log('grid columns:', columns,
                'panel width:', this.props.app.panelSize.width,
                'graph width:', graphWidth);

    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        width: graphWidth,
        height: graphHeight,
      });
    });
  }

  render() {
    return (
      <div>
        {this.renderGraphs()}
      </div>
    );
  }

}


function select(state) {
  return {
    app: state.app,
  };
}


export default connect(select)(GraphHolder);
