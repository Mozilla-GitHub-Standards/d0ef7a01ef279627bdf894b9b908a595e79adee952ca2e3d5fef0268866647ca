import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class Navigation extends Component {

  static propTypes = {
    currentTimeSlice: PropTypes.string.isRequired,
    setTimeSlice: PropTypes.func.isRequired,
  }

  renderButtons() {
    var buttons = [];
    Object.keys(graphite.timeSliceTitles).forEach(key => {
      var classes = ['quiet'];
      if (this.props.currentTimeSlice === key) {
        classes.push('active');
      }
      buttons.push(
        <button
            key={key} className={cx(...classes)}
            onClick={() => this.props.setTimeSlice(key)}>
          {graphite.timeSliceTitles[key]}
        </button>
      );
    });
    return buttons;
  }

  render() {
    return (
      <div className={cx('navigation')}>
        {this.renderButtons()}
      </div>
    );
  }
}
