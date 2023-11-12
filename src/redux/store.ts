import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import accountReducer from "./reducers/AccountSlice";
import categoriesReducer from "./reducers/CategoriesSlice";
import brandsReducer from "./reducers/BrandsSlice";
import goodsReducer from "./reducers/GoodsSlice";
import sliderReducer from "./reducers/SliderSlice";

const rootReducer = combineReducers({
  users: userReducer,
  account: accountReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  goods: goodsReducer,
  sliders: sliderReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    users: userReducer,
    account: accountReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    goods: goodsReducer,
    sliders: sliderReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
