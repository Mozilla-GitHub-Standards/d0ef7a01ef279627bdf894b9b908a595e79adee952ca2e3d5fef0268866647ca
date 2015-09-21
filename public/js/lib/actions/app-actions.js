import * as actionTypes from 'lib/action-types';
import * as graphite from 'lib/utils/graphite'


export function checkForGraphite() {
  return (dispatch) => {
    fetch(graphite.responseCountUrl(), {mode: 'no-cors'})
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
          error: (
            "Hmm, the graphs wouldn't load. " +
            "Make sure you're behind the Mozilla VPN and try again."
          ),
        });
      });
  }
}
