import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';
import { gettext } from 'lib/utils';


export default class Navigation extends Component {

  static propTypes = {
    autoUpdateInterval: PropTypes.number.isRequired,
    currentTimeSlice: PropTypes.string.isRequired,
    toggleGraphReloading: PropTypes.func.isRequired,
    setTimeSlice: PropTypes.func.isRequired,
  }

  static defaultProps = {
    autoUpdateInterval: 0,
  }

  onAutoUpdateChange = () => {
    this.props.toggleGraphReloading();
  }

  renderMenu() {
    var menu = [];

    Object.keys(graphite.timeSliceTitles).forEach(key => {
      var classes = ['quiet'];
      if (this.props.currentTimeSlice === key) {
        classes.push('active');
      }
      menu.push(
        <button
            key={key} className={cx(...classes)}
            onClick={() => this.props.setTimeSlice(key)}>
          {graphite.timeSliceTitles[key]}
        </button>
      );
    });

    menu.push(
        <label>
          <input
            checked={this.props.autoUpdateInterval > 0}
            type="checkbox"
            onChange={this.onAutoUpdateChange}
          />
          {gettext('Auto-update')}
        </label>
    );
    return menu;
  }

  render() {
    return (
      <div className={cx('navigation')}>
        {this.renderMenu()}
      </div>
    );
  }
}
