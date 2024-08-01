import joi from "joi";

import { regexConstant } from "../constants/regex.constants";
import { RoleEnum } from "../enums/role.enum";

export class UserValidator {
  private static userName = joi.string().min(3).trim();
  private static age = joi.number().min(15).max(50);
  private static email = joi.string().lowercase().regex(regexConstant.EMAIL);
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static phone = joi.string().regex(regexConstant.PHONE);
  private static role = joi.string().valid(...Object.values(RoleEnum));

  public static createUser = joi.object({
    name: UserValidator.userName.required(),
    age: UserValidator.age.required(),
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
    phone: UserValidator.phone.required(),
    role: UserValidator.role,
  });

  public static updateUser = joi.object({
    name: UserValidator.userName,
    age: UserValidator.age,
    email: UserValidator.email,
    phone: UserValidator.phone,
  });
  public static signIn = joi.object({
    email: UserValidator.email.required(),
    password: UserValidator.password.required(),
  });
  public static forgotPass = joi.object({
    email: UserValidator.email.required(),
  });
  public static restorePass = joi.object({
    password: UserValidator.password.required(),
  });
  public static changePassword = joi.object({
    oldPassword: UserValidator.password.required(),
    newPassword: UserValidator.password.required(),
  });
}
