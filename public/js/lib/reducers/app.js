import * as actionTypes from 'lib/action-types';
import * as graphite from 'lib/utils/graphite';


export const initialAppState = {
  error: null,
  panelSize: {},
  graphHeight: 350,
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
    case actionTypes.SET_TIME_SLICE:
      return Object.assign({}, state, {
        timeSlice: action.timeSlice,
      });
    default:
      return state || initialAppState;
  }
}
