import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("Адрес запроса");
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось загрузить пользователей");
    }
  }
);
export const fetchAccount = createAsyncThunk(
  "account/fetchOne",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("Адрес запроса");
      return response.data;
    } catch (e) {
      return e;
    }
  }
);
