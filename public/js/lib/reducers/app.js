//import * as actionTypes from 'constants/action-types';


export const initialAppState = {
};


export default function app(state, action) {
  switch (action.type) {
    default:
      return state || initialAppState;
  }
}
