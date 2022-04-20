import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel, UsersState } from "./users.types";
import { ServicePayload } from "../../constants/types";
import { StateType } from "../index";
import { getLocalStorageUsers, removeLocalStorageUser, setLocalStorageUser } from "../../utils";

const initialState: UsersState = {
  data: getLocalStorageUsers() || [],
  loading: false,
  isFetched: false
};

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<ServicePayload<UserModel>>) => {
      state.data = [...state.data.filter(item => item.local), ...action.payload.data];
      if (action.payload.data.length) {
        state.isFetched = true;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    removeUser: (state, action: PayloadAction<UserModel>) => {
      // не стал подтягивать саги, и так кода много получилось
      if (action.payload.local) {
        removeLocalStorageUser(action.payload);
      }
      state.data = state.data.filter(item => item.id !== action.payload.id);
    },
    createUser: (state, action: PayloadAction<UserModel>) => {
      const id = state.data.length ? state.data.reduce((prev, next) => prev >= next.id ? prev : next.id, 0) + 1 : 20;
      const user = { ...action.payload, id };
      state.data = [user as UserModel, ...state.data];
      // не стал подтягивать саги, и так кода много получилось
      setLocalStorageUser(user);
    }
  }
});

export const usersSelectors = {
  getUsers: (state: StateType) => state.users.data,
  getUser: (id: number) => (state: StateType) => state.users.data.find(item => item.id === id),
  getLoading: (state: StateType) => state.users.loading,
  getFetchedStatus: (state: StateType) => state.users.isFetched
}

export const usersActions = usersReducer.actions;

export default usersReducer;
