export type IUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  is_deleted: boolean;
  is_dev: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface IRole {
  name: string;
  is_deleted: boolean;
  is_dev: boolean;
}

export interface ISession {
  token: string;
  expires: number;
}
