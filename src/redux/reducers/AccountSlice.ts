import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAccount } from "./ActionCreator";
import { IAccount } from "../models/IAccount";

interface accountState {
  account: IAccount[];
  isLoading: boolean;
  error: string;
  auth: boolean;
}

const initialState: accountState = {
  account: [],
  isLoading: false,
  error: "",
  auth: false,
};
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    accountFetching(state) {
      state.isLoading = true;
    },
    accountFetchingSuccess(state, action: PayloadAction<IAccount[]>) {
      state.isLoading = false;
      state.error = "";
      state.account = action.payload;
      state.auth = true;
    },
    accountFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.auth = false;
    },
  },
  extraReducers: {
    [fetchAccount.fulfilled.type]: (
      state,
      action: PayloadAction<IAccount[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.account = action.payload;
    },
    [fetchAccount.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default accountSlice.reducer;
