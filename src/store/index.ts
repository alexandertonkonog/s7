import {
  combineReducers,
  configureStore
} from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form'
import usersReducer from "./users";
import authReducer from "./auth";

const rootReducer = combineReducers({
  users: usersReducer.reducer,
  auth: authReducer.reducer,
  form: formReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: true
    })
  ],
});

export type StateType = ReturnType<typeof rootReducer>;

export default store;