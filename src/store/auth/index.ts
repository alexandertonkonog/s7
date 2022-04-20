import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from "./auth.types";
import { StateType } from "../index";
import { TOKEN_KEY, USERS_FILTER_FORM, USERS_KEY } from "../../constants";

const token = localStorage.getItem(TOKEN_KEY)

const initialState: AuthState = {
  isAuth: !!token,
  token: token,
  loading: false
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth: (state, action: PayloadAction<string | null>) => {
      state.isAuth = !!action.payload;
      state.token = action.payload;
      if (!action.payload) {
        // не стал подтягивать саги, и так кода много получилось
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERS_FILTER_FORM);
        localStorage.removeItem(USERS_KEY);
      }
    }
  }
});

export const authSelectors = {
  getAuthState: (state: StateType): AuthState => state.auth
};

export const authActions = authReducer.actions;

export default authReducer;