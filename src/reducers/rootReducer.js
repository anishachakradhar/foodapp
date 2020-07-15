import { combineReducers } from 'redux';

import addFoodReducer from './addFoodReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  addFood: addFoodReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
