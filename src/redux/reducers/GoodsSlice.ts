import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import GoodService, { CreateGoodDto } from "../../services/GoodService";
import { IGood } from "../../models/IGood";
import { GoodsResponse } from "../../models/response/GoodsResponse";
import { message } from "antd";
import { deleteParam, deletePromise } from "./BrandsSlice";

interface goodsState {
  goods: IGood[] | null;
  isLoading: boolean;
  error: string;
  status: Status | null;
}
let activeMessage: any = null;

export const createProduct = createAsyncThunk<
  AxiosResponse<void>,
  CreateGoodDto
>("goods/createGood", async (params, { rejectWithValue }) => {
  try {
    const {
      description,
      name,
      typeId,
      brandId,
      secret,
      storage,
      price,
      main_img,
      imgs,
    } = params;
    const formData = new FormData();

    formData.append("name", params.name);
    formData.append("typeId", params.typeId.toString());
    formData.append("brandId", params.brandId.toString());
    formData.append("price", params.price.toString());
    formData.append("storage", params.storage.toString());
    formData.append("secret", params.secret ? "1" : "0");
    if (params.description) {
      formData.append("description", params.description);
    }
    if (params.main_img) {
      formData.append("main_img", params.main_img[0]);
    }

    // Handle imgs array if needed
    if (params.imgs) {
      for (const key in params.imgs) {
        if (Object.prototype.hasOwnProperty.call(params.imgs, key)) {
          const img = params.imgs[key];
          console.log("img123", img);
          formData.append("imgs", img);
        }
      }
    }

    if (formData.has("name")) {
      console.log("Не пустой и имеет name");
    } else {
      console.log("Пустой");
    }
    const response = await GoodService.create(formData);
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
export const fetchGoods = createAsyncThunk<AxiosResponse<GoodsResponse>>(
  "goods/fetchAll",
  async () => {
    try {
      const response = await GoodService.getAll();
      return response.data;
    } catch (e: any) {
      if (!e?.response) {
        return e.message;
      } else {
        return e.response.data.message;
      }
      alert(`Не удалось загрузить товары \n Ошибка: ${e}`);
    }
  },
);

export const deleteGood = createAsyncThunk<AxiosResponse<string>, deleteParam>(
  "goods/deleteOne",
  async (params, { rejectWithValue }) => {
    try {
      const { id } = params;
      const response = await GoodService.deleteGood(id);
      console.log(response);
      return response.data;
    } catch (e: any) {
      if (!e.response) {
        return rejectWithValue(e);
      } else return rejectWithValue(e?.response.data.message);
    }
  },
);

const initialState: goodsState = {
  goods: null,
  isLoading: false,
  error: "",
  status: null,
};
export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
  extraReducers: {
    [createProduct.fulfilled.type]: (state, action: any) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.success(action.payload.data.message, 3);
    },
    [createProduct.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [createProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3);
      console.log(action.payload);
    },
    [deleteGood.fulfilled.type]: (
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
    [deleteGood.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.loading("Отправка на сервер", 0);
    },
    [deleteGood.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      if (activeMessage) {
        activeMessage();
      }
      activeMessage = message.error(action.payload, 3);
      console.log(action.payload);
    },
    [fetchGoods.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.goods = action.payload.goods;
      console.log("Товары: ", action.payload);
    },
    [fetchGoods.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [fetchGoods.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },
  },
});

export default goodsSlice.reducer;
