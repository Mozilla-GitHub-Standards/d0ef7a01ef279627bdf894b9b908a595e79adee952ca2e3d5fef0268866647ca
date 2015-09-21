import * as actionTypes from 'lib/action-types';


export function checkForGraphite() {
  return (dispatch) => {
    fetch('http://graphite.nag.mktmon.services.phx1.mozilla.com/render/?width=580&height=308&vtitle=count&target=sumSeries(stats.addons.response.*)&target=stats.addons.response.200&target=stats.addons.response.301&target=stats.addons.response.302&target=stats.addons.response.403&target=stats.addons.response.404&target=stats.addons.response.405&target=stats.addons.response.500&target=drawAsInfinite(stats.timers.addons.update.count)&from=-15minutes&title=15%20minutes&', {
      mode: 'no-cors',
    })
      .then(response => {
        console.log('got graphite response; check status?');
      }, error => {
        console.log('error loading graphite graphite:', error);
        dispatch({
          type: actionTypes.APP_ERROR,
          error: (
            "Could not load any graphs. " +
            "Make sure you're behind the Mozilla VPN."
          ),
        });
      });
  }
}
