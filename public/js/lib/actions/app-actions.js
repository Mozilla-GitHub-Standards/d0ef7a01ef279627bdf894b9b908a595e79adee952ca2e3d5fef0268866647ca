import * as actionTypes from 'lib/action-types';
import * as graphite from 'lib/utils/graphite'
import { gettext } from 'lib/utils';


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
