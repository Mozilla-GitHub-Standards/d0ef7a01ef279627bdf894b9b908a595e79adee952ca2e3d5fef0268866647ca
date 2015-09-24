import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import * as graphite from 'lib/utils/graphite';
import { gettext } from 'lib/utils';
import { graphSetList } from 'lib/constants/graph-sets';


export default class Navigation extends Component {

  static propTypes = {
    autoUpdateInterval: PropTypes.number.isRequired,
    currentGraphSet: PropTypes.string.isRequired,
    currentTimeSlice: PropTypes.string.isRequired,
    toggleGraphReloading: PropTypes.func.isRequired,
    setTimeSlice: PropTypes.func.isRequired,
    viewGraphSet: PropTypes.func.isRequired,
  }

  static defaultProps = {
    autoUpdateInterval: 0,
  }

  onAutoUpdateChange = () => {
    this.props.toggleGraphReloading();
  }

  onChangeGraphSet = (e) => {
    var sel = e.target;
    var value = sel.options[sel.selectedIndex].value;
    console.log('changed graph set to', value);
    this.props.viewGraphSet(value);
  }

  renderMenu() {
    var menu = [];

    menu.push(
      <select key="graph-set" value={this.props.currentGraphSet}
          onChange={this.onChangeGraphSet}>
        {graphSetList.map(set =>
          <option value={set.key}>{set.name}</option>
        )}
      </select>
    );

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
