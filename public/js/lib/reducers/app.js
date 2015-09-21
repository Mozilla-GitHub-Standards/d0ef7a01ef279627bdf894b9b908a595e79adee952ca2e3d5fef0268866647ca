import * as actionTypes from 'lib/action-types';


export const initialAppState = {
  error: null,
};


export default function app(state, action) {
  switch (action.type) {
    case actionTypes.APP_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state || initialAppState;
  }
}
