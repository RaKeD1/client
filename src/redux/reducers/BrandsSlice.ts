import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import { IBrand } from "../../models/IBrand";
import BrandsService from "../../services/BrandsService";
import { BrandsResponse } from "../../models/response/BrandsResponse";
import { message } from "antd";

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
let activeMessage: any = null;
export const addBrand = createAsyncThunk<
  AxiosResponse<BrandsResponse>,
  brandsParams
>("brands/addStatus", async (params, { rejectWithValue }) => {
  try {
    const { brand_name, brand_logo, description, url } = params;
    console.log("addBrand", params);
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
    console.log("addBrand", response);
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
      //todo сделать возможность добавлять вывод сообщения о том что бренд создан
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
    [fetchBrands.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.brands = action.payload;
      console.log("Бренды: ", action.payload);
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
