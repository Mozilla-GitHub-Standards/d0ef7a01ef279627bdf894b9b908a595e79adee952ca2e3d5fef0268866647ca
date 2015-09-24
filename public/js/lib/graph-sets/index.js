import { gettext } from 'lib/utils';

import AddonLifecycle from './addon-lifecycle';
import AuthResponses from './auth-responses';
import SitePerformance from './site-perf';

var registry = {};


export function getGraphSet(key) {
  return registry[key];
}


function register(set) {
  registry[set.key] = set;
  return set;
}


export var graphSetList = [
  register({
    key: 'site-performance',
    name: gettext('Site Performance'),
    component: SitePerformance,
  }),
  register({
    key: 'addon-lifecycle',
    name: gettext('Add-on Lifecycle'),
    component: AddonLifecycle,
  }),
  register({
    key: 'auth-requests',
    name: gettext('Authenticated Requests'),
    component: AuthResponses,
  }),
];
