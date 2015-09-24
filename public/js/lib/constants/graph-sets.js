import { gettext } from 'lib/utils';

import SitePerformance from 'lib/components/site-perf';
import AuthResponses from 'lib/components/auth-responses';

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
    key: 'auth-requests',
    name: gettext('Authenticated Requests'),
    component: AuthResponses,
  }),
];
