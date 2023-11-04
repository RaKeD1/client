import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Status } from "./AccountSlice";
import GoodService, { CreateGoodDto } from "../../services/GoodService";
import { IGood } from "../../models/IGood";
import { GoodsResponse } from "../../models/response/GoodsResponse";

interface goodsState {
  goods: IGood[] | null;
  isLoading: boolean;
  error: string;
  status: Status | null;
  res: string;
}

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
      return response;
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

const initialState: goodsState = {
  goods: null,
  isLoading: false,
  error: "",
  status: null,
  res: "",
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

      state.res = action.payload.data.message;
      console.log(state.res);
      //todo сделать возможность добавлять вывод сообщения о том что товар создан
    },
    [createProduct.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.res = "";
      state.error = "";
    },
    [createProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      console.log(action.payload);
    },
    [fetchGoods.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      state.res = "";
      state.goods = action.payload.data.goods;
      console.log("Товары: ", action.payload.data);
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
