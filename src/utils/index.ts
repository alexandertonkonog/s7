import { getFormValues } from 'redux-form';
import { TOKEN_KEY, USERS_FILTER_FORM, USERS_KEY } from "../constants";
import { StateType } from "../store";
import { UserModel } from "../store/users/users.types";
import { UsersFilterFormValues } from "../constants/types";

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const formSelectors = {
  getFormValues: <Type, >(form: string) => (state: StateType): Type => getFormValues(form)(state) as Type
};

export const getLocalStorageUsers = () => {
  const jsonUsers = localStorage.getItem(USERS_KEY);
  if (jsonUsers) return JSON.parse(jsonUsers);
}

export const setLocalStorageUser = (user: UserModel) => {
  const users = getLocalStorageUsers();
  if (users) {
    localStorage.setItem(USERS_KEY, JSON.stringify([user, ...users]));
  } else {
    localStorage.setItem(USERS_KEY, JSON.stringify([user]));
  }
}

export const removeLocalStorageUser = (user: UserModel) => {
  const users: UserModel[] = getLocalStorageUsers();
  localStorage.setItem(USERS_KEY, JSON.stringify(users.filter(item => item.id !== user.id)));
}

export const getLocalStorageUsersFilter = () => {
  const jsonFilter = localStorage.getItem(USERS_FILTER_FORM);
  if (jsonFilter) return JSON.parse(jsonFilter);
}

export const setLocalStorageUsersFilter = (filter: UsersFilterFormValues) => {
  localStorage.setItem(USERS_FILTER_FORM, JSON.stringify(filter));
}