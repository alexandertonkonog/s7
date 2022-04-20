export type UsersState = {
  data: UserModel[];
  loading: boolean;
  isFetched: boolean;
};

export type UserModel = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  local?: boolean;
}