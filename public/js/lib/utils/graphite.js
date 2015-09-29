import { gettext } from 'lib/utils';

// Time slices, as understood by Graphite on the query string.
export const LAST_15_MIN = '-15minutes';
export const LAST_HOUR = '-1hours';
export const LAST_24_HOURS = '-24hours';
export const LAST_WEEK = '-7days';
export const LAST_30_DAYS = '-30days';
export const LAST_90_DAYS = '-90days';

export var timeSliceTitles = {};
timeSliceTitles[LAST_15_MIN] = gettext('15 Min Ago');
timeSliceTitles[LAST_HOUR] = gettext('Last Hr');
timeSliceTitles[LAST_24_HOURS] = gettext('24 Hr Ago');
timeSliceTitles[LAST_WEEK] = gettext('Last Week');
timeSliceTitles[LAST_30_DAYS] = gettext('Last 30 Days');
timeSliceTitles[LAST_90_DAYS] = gettext('Last 90 Days');


export function url(params) {
  // This URL is for prod. There is a different one for dev.
  var renderBase = (
    'http://graphite.nag.mktmon.services.phx1.mozilla.com/render/'
  );
  var query = '';
  Object.keys(params).forEach(key => {
    var val = params[key];
    if (typeof val === 'undefined') {
      throw new Error('no URL params can be undefined. Check the key: ' + key);
    }
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
    ],
    ...params,
  });
}


export function authResponseCountUrl({...params} = {}) {
  return url({
    vtitle: 'scale',
    target: [
      'stats.addons.response.auth.200',
      'scale(stats.addons.response.200,0.1)',
    ],
    ...params,
  });
}


export function responseTimesUrl({...params} = {}) {
  return url({
    vtitle: 'milleseconds',
    target: [
      'stats.timers.addons.view.GET.lower',
      'stats.timers.addons.view.GET.mean',
      'stats.timers.addons.view.GET.upper_90',
      deployMarker(),
    ],
    ...params,
  });
}


export function searchTimesUrl({...params} = {}) {
  return url({
    vtitle: 'milleseconds',
    target: [
      'stats.timers.addons.view.search.views.search.GET.lower',
      'stats.timers.addons.search.raw.lower',
      'stats.timers.addons.view.search.views.search.GET.mean',
      'stats.timers.addons.search.raw.mean',
      'stats.timers.addons.view.search.views.search.GET.upper_90',
      'stats.timers.addons.search.raw.upper_90',
      'scale(stats.timers.addons.view.search.views.search.GET.count,0.1)',
      'scale(stats.timers.addons.search.raw.count,0.1)',
      deployMarker(),
    ],
    ...params,
  });
}


export function redirectsAndErrorsUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: [
      'stats.addons.response.301',
      'stats.addons.response.302',
      'stats.addons.response.304',
      'stats.addons.response.400',
      'stats.addons.response.403',
      'stats.addons.response.404',
      'stats.addons.response.405',
      'stats.addons.response.500',
      'stats.addons.response.503',
      deployMarker(),
    ],
    ...params,
  });
}


export function allAddonStatusChangesUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: addonStatusChangeTargets('all'),
    ...params,
  });
}


export function listedAddonStatusChangesUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: addonStatusChangeTargets('listed'),
    ...params,
  });
}


export function unlistedAddonStatusChangesUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: addonStatusChangeTargets('unlisted'),
    ...params,
  });
}


export function addonValidationTimesUrl({...params} = {}) {
  return url({
    vtitle: 'milleseconds',
    target: [
      'stats.timers.addons.devhub.validator.lower',
      'stats.timers.addons.devhub.validator.mean',
      'stats.timers.addons.devhub.validator.upper_90',
    ],
    ...params,
  });
}


export function addonValidationCountUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: [
      'summarize(stats.addons.devhub.validator.results.all.success, "1day", "max", true)',
      'summarize(stats.addons.devhub.validator.results.all.failure, "1day", "max", true)',
    ],
    ...params,
  });
}


export function autoSignableAddonCountUrl({...params} = {}) {
  return url({
    vtitle: 'count',
    target: [
      'summarize(stats.addons.devhub.validator.results.unlisted.is_signable, "1day", "max", true)',
      'summarize(stats.addons.devhub.validator.results.unlisted.is_not_signable, "1day", "max", true)',
    ],
    ...params,
  });
}


export function addonGUIDSearchTimeUrl({...params} = {}) {
  return url({
    vtitle: 'milleseconds',
    target: [
      'stats.timers.addons.view.api.views.guid_search.GET.lower',
      'stats.timers.addons.view.api.views.guid_search.GET.mean',
      'stats.timers.addons.view.api.views.guid_search.GET.upper_90',
      'scale(stats.timers.addons.view.api.views.guid_search.GET.count(0.01)',
      deployMarker(),
    ],
    ...params,
  });
}


export function addonGUIDSearchCountUrl({...params} = {}) {
  // Is this graph really a count? Hmmm. It's from the old dashboard.
  return url({
    vtitle: 'count',
    target: [
      'scale(stats.timers.addons.view.api.views.guid_search.GET.count,0.1)',
    ],
    ...params,
  });
}


function addonStatusChangeTargets(statType) {
  var targets = [
    'sumSeries(stats.addons.addon_status_change.{statType}.*)',
    // Legend: github.com/mozilla/olympia/.../apps/constants/base.py
    'stats.addons.addon_status_change.{statType}.status_0',
    'stats.addons.addon_status_change.{statType}.status_1',
    'stats.addons.addon_status_change.{statType}.status_2',
    'stats.addons.addon_status_change.{statType}.status_3',
    'stats.addons.addon_status_change.{statType}.status_4',
    'stats.addons.addon_status_change.{statType}.status_7',
    'stats.addons.addon_status_change.{statType}.status_8',
    'stats.addons.addon_status_change.{statType}.status_9',
    'stats.addons.addon_status_change.{statType}.status_12',
    'stats.addons.addon_status_change.{statType}.status_14',
  ];
  return targets.map(t => t.replace('{statType}', statType));
}


/*
 * Returns a target property that draws a vertical line when the
 * site is deployed.
 */
function deployMarker() {
  return 'drawAsInfinite(stats.timers.addons.update.count)';
}
