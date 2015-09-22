import React, { Component, PropTypes } from 'react';
import cx from 'classnames';


export default class Grid extends Component {

  static propTypes = {
    columns: PropTypes.number.isRequired,
  }

  renderRows() {
    var rows = [];
    for (var offset = 0; true; offset += this.props.columns) {
      var nextSet = this.props.children.slice(
        offset, offset + this.props.columns
      );
      if (nextSet.length == 0) {
        break;
      }
      rows.push(
        <div className={cx('grid-row')}>
          {nextSet}
        </div>
      );
    }
    return rows;
  }

  render() {
    return (
      <div className={cx('grid')}>
        {this.renderRows()}
      </div>
    );
  }
}
