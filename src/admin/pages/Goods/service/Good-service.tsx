import { FC } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import GoodService, { CreateGoodDto } from "../../../../services/GoodService";

export const createProduct = createAsyncThunk<void, CreateGoodDto>(
  "admin/createGood",
  async (params, { rejectWithValue }) => {
    try {
      const { description, name, type, brand, secret, storage, price } = params;
      await GoodService.create(params);
    } catch (error: any) {
      //todo исправить тип с any на другой
      console.log(error);
      if (!error?.response) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  },
);
