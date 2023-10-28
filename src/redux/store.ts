import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import accountReducer from "./reducers/AccountSlice";
import categoriesReducer from "./reducers/CategoriesSlice";
import brandsReducer from "./reducers/BrandsSlice";
import goodsReducer from "./reducers/GoodsSlice";

const rootReducer = combineReducers({
  userReducer,
  account: accountReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  goods: goodsReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    user: userReducer,
    account: accountReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    goods: goodsReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
