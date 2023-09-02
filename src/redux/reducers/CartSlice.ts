import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status, fetchAccount } from "./ActionCreator";

export interface IOrder {
  id_account: number | null;
  datetime: Date | null;
  sum: number | null;
  delivery_type: string;
  adress: string;
}

interface accountState {
  order: IOrder;
  isLoading: boolean;
  error: string;
  status: Status;
}

const initialState: accountState = {
  order: {
    id_account: null,
    datetime: null,
    sum: null,
    delivery_type: "info",
    adress: "",
  },
  isLoading: false,
  error: "",
  status: Status.ERROR,
};
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    accountFetching(state) {
      state.isLoading = true;
      state.status = Status.LOADING;
    },
    accountFetchingSuccess(state, action: PayloadAction<IOrder>) {
      state.isLoading = false;
      state.error = "";
      state.order = action.payload;
      state.status = Status.SUCCESS;
    },
    accountFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.status = Status.ERROR;
    },
  },
  extraReducers: {
    [fetchAccount.fulfilled.type]: (state, action: PayloadAction<IOrder>) => {
      state.isLoading = false;
      state.error = "";
      state.order = action.payload;
    },
    [fetchAccount.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
      state.order = initialState.order;
    },
    [fetchAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default accountSlice.reducer;
