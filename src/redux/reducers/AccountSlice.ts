import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccount } from "./ActionCreator";
import { IAccount } from "../../models/IAccount";
import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import AuthService from "../../services/AuthService";

const localAuth = (local: string) => {
  if (local === "false") return false;
  else if (local === "true") return true;
  else return null;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface accountState {
  user: IAccount | null;
  isLoading: boolean;
  error: string;
  isAuth: boolean | null;
  status: Status;
}
interface userResponse {
  data: loginData;
}
interface loginData {
  user: IAccount;
  accessToken: string;
}
export type loginParams = {
  email: string;
  password: string;
};
export type registrParams = {
  email: string;
  password: string;
};

export const loginAccount = createAsyncThunk<
  AxiosResponse<AuthResponse>,
  loginParams
>("user/loginStatus", async (params, { rejectWithValue }) => {
  try {
    const { email, password } = params;
    const response = await AuthService.login(email, password);
    console.log("login", response);
    return response;
  } catch (error: any) {
    //fixme исправить тип с any на другой
    console.log(error);
    if (!error.response) {
      return rejectWithValue(error.message);
    } else return rejectWithValue(error.response.data.message);
  }
});

export const registrAccount = createAsyncThunk<
  AxiosResponse<AuthResponse>,
  registrParams
>("user/registrStatus", async (params, { rejectWithValue }) => {
  try {
    const { email, password } = params;
    const response = await AuthService.registration(email, password);
    console.log("registration", response);
    return response;
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue(error.message);
    } else return rejectWithValue(error.response.data.message);
  }
});

export const logoutAccount = createAsyncThunk<void, void>(
  "user/logoutStatus",
  async () => {
    try {
      await AuthService.logout();
      console.log("logout");
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  },
);

export const checkAuth = createAsyncThunk<void, void>(
  "user/checkAuthStatus",
  async () => {
    try {
      const response = await AuthService.refresh();
      return response;
    } catch (error: any) {
      //fixme исправить тип с any на другой
      if (!error.response) {
        alert(error.message);
        throw error;
      }
      alert(error.response.data.message);
    }
  },
);

const initialState: accountState = {
  user: null,
  isLoading: false,
  error: "",
  status: Status.SUCCESS,
  isAuth: localStorage.isAuth ? localAuth(localStorage.isAuth) : false,
};
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    accountFetching(state) {
      state.isLoading = true;
    },
    accountFetchingSuccess(state, action: PayloadAction<IAccount>) {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
      console.log("accountFetching", state);
      localStorage.isAuth = true;
      state.isAuth = true;
    },
    accountFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      localStorage.isAuth = false;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [loginAccount.fulfilled.type]: (state, action: any) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      localStorage.setItem("token", action.payload.data.accessToken);
      // localStorage.setItem('role', action.payload.data.user.roles);
      state.user = action.payload.data.user;
      console.log("state.user-login", state.user);
      state.isAuth = true;
      localStorage.isAuth = true;
    },
    [loginAccount.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [loginAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
      console.log(action.payload);
    },
    [registrAccount.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      state.isLoading = false;
      state.error = "";
      localStorage.setItem("token", action.payload.data.accessToken);
      // localStorage.setItem('role', action.payload.data.user.role);
      state.user = action.payload.data.user;
      state.isAuth = true;
      localStorage.isAuth = true;
    },
    [registrAccount.pending.type]: (state) => {
      state.isLoading = true;
      state.status = Status.LOADING;
      state.error = "";
    },
    [registrAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.status = Status.ERROR;
      state.error = action.payload;
    },

    [logoutAccount.fulfilled.type]: (state, action) => {
      state.status = Status.SUCCESS;
      localStorage.removeItem("token");
      // localStorage.removeItem('role');
      state.isAuth = false;
      localStorage.isAuth = false;
    },
    [logoutAccount.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [logoutAccount.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = Status.ERROR;
    },
    // [fetchAccount.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<IAccount[]>
    // ) => {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.account = action.payload;
    // },
    // [fetchAccount.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = "";
    // },
    // [fetchAccount.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    [checkAuth.fulfilled.type]: (state, action) => {
      if (action.payload.data.accessToken) {
        localStorage.setItem("token", action.payload.data.accessToken);
        state.user = action.payload.data.user;
        state.status = Status.SUCCESS;
        localStorage.setItem("token", action.payload.data.accessToken);
        // localStorage.setItem('role');
        localStorage.isAuth = true;
        state.isAuth = true;
      } else {
        console.log(1234);
        state.status = Status.SUCCESS;
        localStorage.isAuth = false;
        state.isAuth = false;
      }
    },
    [checkAuth.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [checkAuth.rejected.type]: (state) => {
      state.status = Status.ERROR;
      console.log("problem auth");
      state.isAuth = false;
    },
  },
});
export const user = accountSlice.actions.accountFetching;
export default accountSlice.reducer;
