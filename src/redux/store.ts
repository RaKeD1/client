import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import accountReducer from "./reducers/AccountSlice";

const rootReducer = combineReducers({
  userReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    user: userReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
