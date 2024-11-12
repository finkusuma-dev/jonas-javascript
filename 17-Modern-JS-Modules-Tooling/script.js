// const { cloneDeep } = require("lodash-es");

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import { cloneDeep } from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 4 },
  ],
  user: {
    loggedIn: true,
  },
};

const stateClone = cloneDeep(state);
state.user.loggedIn = false;
console.dir({ state, stateClone });

if (module.hot) {
  module.hot.accept();
}
