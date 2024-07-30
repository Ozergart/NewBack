import { tokenActionTypeEnum } from "../enums/tokenTypes.enum";
import { IUser } from "./user.interface";

export interface IActionToken {
  _id?: string;
  actionToken: string;
  type: tokenActionTypeEnum;
  _userId: string | IUser;
}

export interface IForgotSendEmail extends Pick<IUser, "email"> {}

export interface IForgotResetPassword extends Pick<IUser, "password"> {}
