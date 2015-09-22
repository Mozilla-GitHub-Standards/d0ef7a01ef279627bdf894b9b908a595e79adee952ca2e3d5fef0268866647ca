import { gettext } from 'lib/utils';

// Time slices, as understood by Graphite on the query string.
export const LAST_15_MIN = '-15minutes';
export const LAST_HOUR = '-1hours';
export const LAST_24_HOURS = '-24hours';
export const LAST_WEEK = '-7days';
export const LAST_30_DAYS = '-30days';
export const LAST_90_DAYS = '-90days';

export var graphTitles = {};
graphTitles[LAST_15_MIN] = gettext('15 Minutes Ago');
graphTitles[LAST_HOUR] = gettext('Last Hour');
graphTitles[LAST_24_HOURS] = gettext('24 Hours Ago');
graphTitles[LAST_WEEK] = gettext('Last Week');
graphTitles[LAST_30_DAYS] = gettext('Last 30 Days');
graphTitles[LAST_90_DAYS] = gettext('Last 90 Days');


export function url(params) {
  // This URL is for prod. There is a different one for dev.
  var renderBase = (
    'http://graphite.nag.mktmon.services.phx1.mozilla.com/render/'
  );
  var query = '';
  Object.keys(params).forEach(key => {
    var val = params[key];
    if (val instanceof Array) {
      // Graphite wants to receive repeating params like
      // target=...&target=...
      val.forEach(multiVal => {
        query += key + '=' + encodeURIComponent(multiVal.toString());
        query += '&';
      });
    } else {
      query += key + '=' + encodeURIComponent(val.toString()) + '&';
    }
  });
  var url = renderBase + '?' + query;
  return url;
}


export function responseCountUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: [
      'sumSeries(stats.addons.response.*)',
      'stats.addons.response.200',
      'stats.addons.response.301',
      'stats.addons.response.302',
      'stats.addons.response.403',
      'stats.addons.response.404',
      'stats.addons.response.405',
      'stats.addons.response.500',
      'drawAsInfinite(stats.timers.addons.update.count)',
    ],
    ...params,
  });
}
