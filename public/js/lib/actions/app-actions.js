import * as actionTypes from 'lib/action-types';
import * as graphite from 'lib/utils/graphite'
import { gettext } from 'lib/utils';
import { initialAppState } from 'lib/reducers/app';


export function checkForGraphite() {
  return (dispatch) => {
    fetch(graphite.responseCountUrl(), {mode: 'no-cors', cache: 'no-cache'})
      .then(response => {
        console.log('got graphite response');
        if (!response.ok && response.status > 0) {
          // Maybe handle this better.
          throw new Error(
              'unexpected response status: ' + response.status)
        }
      }, error => {
        console.log('error loading graphite graphite:', error);
        dispatch({
          type: actionTypes.APP_ERROR,
          error: gettext(
            "Hmm, the graphs wouldn't load. " +
            "Make sure you're behind the Mozilla VPN and try again."
          ),
        });
      });
  }
}


export function setTimeSlice(key) {
  return {
    type: actionTypes.SET_TIME_SLICE,
    timeSlice: key,
  };
}


export function setPanelSize({width, height}) {
  return {
    type: actionTypes.DECLARE_PANEL_SIZE,
    width: width,
    height: height,
  };
}


export function reloadGraphImages() {
  return {
    type: actionTypes.RELOAD_GRAPH_IMAGES,
  };
}


export function startReloadingGraphs({win=window} = {}) {
  return (dispatch, getState) => {
    var state = getState();

    var updateInterval = state.app.autoUpdateInterval;
    if (updateInterval === 0) {
      updateInterval = initialAppState.autoUpdateInterval;
    }
    console.log('starting to reload graphs at interval',
                updateInterval);
    dispatch({
      type: actionTypes.START_RELOADING_GRAPHS,
      updateInterval: updateInterval,
      intervalRef: win.setInterval(() => {
        dispatch(reloadGraphImages());
      }, updateInterval),
    });
  };
}


export function stopReloadingGraphs() {
  return {
    type: actionTypes.STOP_RELOADING_GRAPHS,
  };
}


export function toggleGraphReloading() {
  return (dispatch, getState) => {
    var state = getState();
    if (state.app.autoUpdateInterval) {
      dispatch(stopReloadingGraphs());
    } else {
      dispatch(startReloadingGraphs());
    }
  };
}
