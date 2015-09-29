import * as actionTypes from 'lib/constants/action-types';
import * as graphite from 'lib/utils/graphite';
import { genId } from 'lib/utils';
import { graphSetList } from 'lib/graph-sets';


export const initialAppState = {
  error: null,
  panelSize: {},
  autoUpdateInterval: 4000,
  graphHeight: 350,
  // When this changes, the graph image will be reloaded.
  graphImageNonce: genId(),
  // reference to setInterval() instance.
  graphReloaderInterval: null,
  graphSet: graphSetList[0].key,
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
    case actionTypes.PAUSE_RELOADING_GRAPHS:
      if (state.graphReloaderInterval) {
        console.log('pausing graph reloader interval',
                    state.graphReloaderInterval);
        window.clearInterval(state.graphReloaderInterval);
      }
      return Object.assign({}, state, {
        graphReloaderInterval: initialAppState.graphReloaderInterval,
      });
    case actionTypes.RELOAD_GRAPH_IMAGES:
      return Object.assign({}, state, {
        graphImageNonce: genId(),
      });
    case actionTypes.RESUME_RELOADING_GRAPHS:
      return Object.assign({}, state, {
        graphReloaderInterval: action.intervalRef,
      });
    case actionTypes.START_RELOADING_GRAPHS:
      return Object.assign({}, state, {
        autoUpdateInterval: action.updateInterval,
        graphReloaderInterval: action.intervalRef,
      });
    case actionTypes.STOP_RELOADING_GRAPHS:
      if (state.graphReloaderInterval) {
        console.log('stopping graph reloader interval',
                    state.graphReloaderInterval);
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
    case actionTypes.VIEW_GRAPH_SET:
      return Object.assign({}, state, {
        graphSet: action.graphSet,
      });
    default:
      return state || initialAppState;
  }
}
