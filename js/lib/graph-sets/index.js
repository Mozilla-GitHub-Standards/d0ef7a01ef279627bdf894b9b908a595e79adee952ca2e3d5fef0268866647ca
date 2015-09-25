import { gettext } from 'lib/utils';

import AddonLifecycle from './addon-lifecycle';
import AuthResponses from './auth-responses';
import GUIDSearch from './guid-search';
import SearchPerformance from './search-perf';
import SitePerformance from './site-perf';
import ValidatorPerf from './validator-perf';

var registry = {};


export function getGraphSet(key) {
  return registry[key];
}


function register(set) {
  registry[set.key] = set;
  return set;
}


// The graph set navigation menu will show items in this exact order.
export var graphSetList = [
  register({
    key: 'site-performance',
    name: gettext('Site Performance'),
    component: SitePerformance,
  }),
  register({
    key: 'search-performance',
    name: gettext('Search Performance'),
    component: SearchPerformance,
  }),
  register({
    key: 'addon-lifecycle',
    name: gettext('Add-on Lifecycle'),
    component: AddonLifecycle,
  }),
  register({
    key: 'validator-perf',
    name: gettext('Add-on Validation'),
    component: ValidatorPerf,
  }),
  register({
    key: 'guid-search',
    name: gettext('Add-on GUID Search'),
    component: GUIDSearch,
  }),
  register({
    key: 'auth-requests',
    name: gettext('Authenticated Requests'),
    component: AuthResponses,
  }),
];
