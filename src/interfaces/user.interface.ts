import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  Avatar?: string;
  lastActivity?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IChangPass {
  oldPassword: string;
  newPassword: string;
}
