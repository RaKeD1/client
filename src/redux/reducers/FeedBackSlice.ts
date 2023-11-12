import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import { FeedBackResponse } from "../../models/response/FeedBackResponse";
import { message } from "antd";
import { IFeedBack } from "../../models/IFeedBack";
import FeedBackService from "../../services/FeedBackService";

interface brandsState {
  brands: IFeedBack[] | null;
  isLoading: boolean;
  error: string;
  status: Status;
}
interface feedBackParams {
  reason: string;
  id_admin: number;
  id_from: number;
  description: string;
}
let activeMessage: any = null;
export const addFeedBack = createAsyncThunk<
  AxiosResponse<FeedBackResponse>,
  feedBackParams
>("feedBack/addStatus", async (params, { rejectWithValue }) => {
  try {
    const { reason, id_admin, description, id_from } = params;
    console.log("addBrand", params);

    const response = await FeedBackService.create(params);
    console.log("addFeedBack", response);
    return response;
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue(error.message);
    } else return rejectWithValue(error.response.data.message);
  }
});
export const fetchFeedBacks = createAsyncThunk(
  "feedBack/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await FeedBackService.getAll();
      return response;
    } catch (e) {
      return thunkApi.rejectWithValue(
        "Не удалось загрузить данные с обратной связью",
      );
    }
  },
);

const initialState: brandsState = {
  brands: null,
  isLoading: false,
  error: "",
  status: Status.SUCCESS,
};
export const feedBackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: {
    [addFeedBack.fulfilled.type]: (state, action: any) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.success(action.payload.data.message, 3);
    },
    [addFeedBack.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [addFeedBack.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3);
    },
    [fetchFeedBacks.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.brands = action.payload.data;
      console.log("Бренды: ", action.payload.data);
    },
    [fetchFeedBacks.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [fetchFeedBacks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },
  },
});
export default feedBackSlice.reducer;
