import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import { Status } from "./AccountSlice";
import { IBrand } from "../../models/IBrand";
import BrandsService from "../../services/BrandsService";

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

export const addBrand = createAsyncThunk<
  AxiosResponse<AuthResponse>,
  brandsParams
>("brands/addStatus", async (params, { rejectWithValue }) => {
  try {
    const { brand_name, brand_logo, description, url } = params;
    console.log("addBrand", params);
    const response = await BrandsService.create({
      brand_name,
      brand_logo,
      description,
      url,
    });
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
      return response;
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
      //todo сделать возможность добавлять вывод сообщения о том что бренд создан
    },
    [addBrand.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [addBrand.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      console.log(action.payload);
    },
    [fetchBrands.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.brands = action.payload.data;
      console.log("Категории: ", action.payload.data);
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
