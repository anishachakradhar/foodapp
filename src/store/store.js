import { createStore } from 'redux';

import dashboardReducer from '../reducers/dashboardReducer';
 
const store = createStore(
  dashboardReducer,
);

export default store;