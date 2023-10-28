import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import { Status } from "./AccountSlice";
import CategoriesService from "../../services/CategoriesService";
import { ICategories } from "../../models/ICategories";
import { CategoriesResponse } from "../../models/response/CategoriesResponse";
import { Alert } from "antd";
interface categoriesState {
  categories: ICategories[] | null;
  isLoading: boolean;
  error: string;
  status: Status;
  message: string;
}
interface categoriesParams {
  type_name: string;
  parent?: number | null;
  img?: string;
}

export const addCategories = createAsyncThunk<
  AxiosResponse<void>,
  categoriesParams
>("categories/addStatus", async (params, { rejectWithValue }) => {
  try {
    const { type_name, parent, img } = params;
    console.log("addCategoriesParams", params);
    const response = await CategoriesService.create({ type_name, parent, img });
    console.log("addCategories", response);
    return response;
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue(error.message);
    } else return rejectWithValue(error.response.data.message);
  }
});
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await CategoriesService.getAll();
      return response;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось загрузить категории");
    }
  },
);

const initialState: categoriesState = {
  categories: null,
  isLoading: false,
  error: "",
  status: Status.SUCCESS,
  message: "",
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // accountFetching(state) {
    //   state.isLoading = true;
    // },
    // accountFetchingSuccess(state, action: PayloadAction<IAccount>) {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.categories = action.payload;
    // },
    // accountFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: {
    [addCategories.fulfilled.type]: (state, action: any) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.message = action.payload.data.message;
    },
    [addCategories.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      state.message = "Загрузка";
    },
    [addCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      console.log(action.payload);
      state.message = "Ошибка создания категории";
    },
    [fetchCategories.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.categories = action.payload.data;
      console.log("Категории: ", action.payload.data);
    },
    [fetchCategories.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [fetchCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },
  },
});
// export const categories = categoriesSlice.actions;
export default categoriesSlice.reducer;
