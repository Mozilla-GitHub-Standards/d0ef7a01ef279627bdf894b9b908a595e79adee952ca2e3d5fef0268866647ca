import * as actionTypes from 'lib/action-types';
import * as graphite from 'lib/utils/graphite';
import { genId } from 'lib/utils';


export const initialAppState = {
  error: null,
  panelSize: {},
  autoUpdateInterval: 4000,
  graphHeight: 350,
  // When this changes, the graph image will be reloaded.
  graphImageNonce: genId(),
  // reference to setInterval() instance.
  graphReloaderInterval: null,
  timeSlice: graphite.LAST_15_MIN,
};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.APP_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    case actionTypes.DECLARE_PANEL_SIZE:
      return Object.assign({}, state, {
        panelSize: Object.assign({}, state.panelSize, {
          width: action.width,
          height: action.height,
        }),
      });
    case actionTypes.RELOAD_GRAPH_IMAGES:
      return Object.assign({}, state, {
        graphImageNonce: genId(),
      });
    case actionTypes.START_RELOADING_GRAPHS:
      return Object.assign({}, state, {
        autoUpdateInterval: action.updateInterval,
        graphReloaderInterval: action.intervalRef,
      });
    case actionTypes.STOP_RELOADING_GRAPHS:
      if (state.graphReloaderInterval) {
        window.clearInterval(state.graphReloaderInterval);
      }
      return Object.assign({}, state, {
        autoUpdateInterval: 0,
        graphReloaderInterval: initialAppState.graphReloaderInterval,
      });
    case actionTypes.SET_TIME_SLICE:
      return Object.assign({}, state, {
        timeSlice: action.timeSlice,
      });
    default:
      return state || initialAppState;
  }
}
