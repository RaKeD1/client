import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import CategoriesService from "../../services/CategoriesService";
import { ICategories } from "../../models/ICategories";
import { CategoriesResponse } from "../../models/response/CategoriesResponse"; //todo добавить промисы
import { message } from "antd";
import { RootState } from "../store";
import { deleteParam, deletePromise } from "./BrandsSlice";
interface categoriesState {
  categories: ICategories[] | null;
  isLoading: boolean;
  error: string;
  status: Status;
}
interface categoriesParams {
  type_name: string;
  parent?: number | null;
  img?: string;
}
let activeMessage: any = null;

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
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось загрузить категории");
    }
  },
);
export const deleteCategory = createAsyncThunk<
  AxiosResponse<string>,
  deleteParam
>("category/deleteOne", async (params, { rejectWithValue }) => {
  try {
    const { id } = params;
    const response = await CategoriesService.deleteCategory(id);
    console.log(response);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      return rejectWithValue(e);
    } else return rejectWithValue(e?.response.data.message);
  }
});

const initialState: categoriesState = {
  categories: null,
  isLoading: false,
  error: "",
  status: Status.SUCCESS,
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
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.success(action.payload.data.message, 3);
    },
    [addCategories.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [addCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3); //fixme два раза отображается всплывающее уведомление
    },
    [deleteCategory.fulfilled.type]: (
      state,
      action: PayloadAction<deletePromise>,
    ) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.success(action.payload.message, 3);
    },
    [deleteCategory.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [deleteCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3); //fixme два раза отображается всплывающее уведомление
    },
    [fetchCategories.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.categories = action.payload;
      console.log("Категории: ", action.payload);
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
export const SelectCategoriesSlice = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
