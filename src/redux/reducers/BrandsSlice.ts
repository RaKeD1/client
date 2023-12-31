import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import { IBrand } from "../../models/IBrand";
import BrandsService from "../../services/BrandsService";
import { BrandsResponse } from "../../models/response/BrandsResponse";
import { message } from "antd";

export interface deletePromise {
  message: string;
}
interface brandsState {
  brands: IBrand[] | null;
  isLoading: boolean;
  error: string;
  status: Status;
}
interface brandsParams {
  brand_name: string;
  brand_logo?: string;
  description?: string;
  url?: string;
}
export interface deleteParam {
  id: number;
}
let activeMessage: any = null;
export const addBrand = createAsyncThunk<
  AxiosResponse<BrandsResponse>,
  brandsParams
>("brands/addStatus", async (params, { rejectWithValue }) => {
  try {
    const { brand_name, brand_logo, description, url } = params;
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    if (brand_logo) {
      formData.append("brand_logo", brand_logo[0]);
    }
    if (description) {
      formData.append("description", description);
    }
    if (url) {
      formData.append("url", url);
    }
    const response = await BrandsService.create(formData);
    return response;
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue(error.message);
    } else return rejectWithValue(error.response.data.message);
  }
});
export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await BrandsService.getAll();
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось загрузить бренды");
    }
  },
);
export const deleteBrand = createAsyncThunk<
  AxiosResponse<deletePromise>,
  deleteParam
>("brands/deleteOne", async (params, { rejectWithValue }) => {
  try {
    const { id } = params;
    const response = await BrandsService.deleteBrand(id);
    return response.data;
  } catch (e: any) {
    if (!e.response) {
      return rejectWithValue(e);
    } else return rejectWithValue(e?.response.data.message);
  }
});

const initialState: brandsState = {
  brands: null,
  isLoading: false,
  error: "",
  status: Status.SUCCESS,
};
export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: {
    [addBrand.fulfilled.type]: (state, action: any) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.success(action.payload.data.message, 3);
    },
    [addBrand.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [addBrand.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3);
    },
    [deleteBrand.fulfilled.type]: (
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
    [deleteBrand.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [deleteBrand.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3);
    },
    [fetchBrands.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.brands = action.payload;
    },
    [fetchBrands.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [fetchBrands.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },
  },
});
export default brandsSlice.reducer;
