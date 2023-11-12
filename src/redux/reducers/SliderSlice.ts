import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import { ISliderHome } from "../../models/Slider/ISliderHome";
import { CreateSliderHomeDto } from "../../pages/Admin/SliderHome/addSlider";
import SliderService from "../../services/SliderService";
import { message } from "antd";
interface sliderState {
  sliderHome: ISliderHome[] | null;
  isLoading: boolean;
  error: string;
  status: Status | null;
}
let activeMessage: any = null;

export const createSlideHome = createAsyncThunk<
  AxiosResponse<void>,
  CreateSliderHomeDto
>("sliderHome/createSlider", async (params, { rejectWithValue }) => {
  try {
    const { active, url, content, title, img } = params;
    const formData = new FormData();

    if (content) {
      formData.append("content", content);
    }

    formData.append("title", title);
    formData.append("active", active.toString());

    if (url) {
      formData.append("url", url);
    }
    formData.append("img", img[0]);

    const response = await SliderService.create(formData);
    return response;
  } catch (error: any) {
    //todo исправить тип с any на другой
    console.log(error);
    if (!error?.response) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error.response.data.message);
    }
  }
});

export const fetchSliderHome = createAsyncThunk<AxiosResponse<ISliderHome>>(
  "sliderhome/fetchAll",
  async () => {
    try {
      const response = await SliderService.getAll();
      return response.data;
    } catch (e: any) {
      console.log("Ошибка запроса слайдера: ", e);
      if (!e?.response) {
        return e.message;
      } else {
        return e.response.data.message;
      }
    }
  },
);
export const fetchActiveSliderHome = createAsyncThunk<
  AxiosResponse<ISliderHome>
>("sliderhome/fetchActive", async () => {
  try {
    const response = await SliderService.getActiveAll();
    return response;
  } catch (e: any) {
    console.log("Ошибка запроса активных слайдов: ", e);
    if (!e?.response) {
      return e.message;
    } else {
      return e.response.data.message;
    }
  }
});
const initialState: sliderState = {
  sliderHome: null,
  isLoading: false,
  error: "",
  status: null,
};
export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: {
    [createSlideHome.fulfilled.type]: (state, action: any) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.success(action.payload.data.message, 3);
    },
    [createSlideHome.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [createSlideHome.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3);
    },

    [fetchSliderHome.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.sliderHome = action.payload;
      console.log("Слайдер: ", action.payload);
    },
    [fetchSliderHome.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [fetchSliderHome.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },

    [fetchActiveSliderHome.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.sliderHome = action.payload.data;
      console.log("Слайдер: ", action.payload.data);
    },
    [fetchActiveSliderHome.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [fetchActiveSliderHome.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },
  },
});

export default sliderSlice.reducer;
