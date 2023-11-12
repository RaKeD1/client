import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchUsers } from "./ActionCreator";
import UserService from "../../services/UserService";

interface UsersState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await UserService.fetchUsers();
      return response;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось загрузить бренды");
    }
  },
);
export const fetchAdmins = createAsyncThunk(
  "users/fetchAdmins",
  async (_, thunkApi) => {
    try {
      const response = await UserService.fetchAdmins();
      return response;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось загрузить бренды");
    }
  },
);
const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: "",
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [fetchAllUsers.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchAllUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchAdmins.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload.data;
    },
    [fetchAdmins.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchAdmins.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
