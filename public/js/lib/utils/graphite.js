
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
    'from': '-15minutes',
    title: '15 minutes',
    ...params,
  });
}
