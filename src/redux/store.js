import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dev_teams_slice from "./dev_teams_slice";

const combinedReducer = combineReducers({
   dev_teams_slice: dev_teams_slice
});

// Root reducer that resets state on "RESET_STATE" action
const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined; // Reset all slices
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
