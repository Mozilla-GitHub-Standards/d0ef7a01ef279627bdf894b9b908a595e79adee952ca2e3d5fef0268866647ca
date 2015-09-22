import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';


export default class TimeSliceNav extends Component {

  static propTypes = {
    current: PropTypes.string.isRequired,
    setTimeSlice: PropTypes.func.isRequired,
  }

  renderButtons() {
    var buttons = [];
    Object.keys(graphite.timeSliceTitles).forEach(key => {
      var classes = ['quiet'];
      if (this.props.current === key) {
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
      <div className={cx('time-slice-nav')}>
        {this.renderButtons()}
      </div>
    );
  }
}
