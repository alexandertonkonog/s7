export type UsersFilterFormValues = {
  email: string;
  first_name: string;
  last_name: string;
};

export type ServicePayload<Type> = {
  data: Type[];
  page: number;
  per_page: number;
  support: { url: string, text: string };
  total: number;
  total_pages: number;
};