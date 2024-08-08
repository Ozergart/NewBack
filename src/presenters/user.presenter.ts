import { configs } from "../configs/configs";
import {
  IUser,
  IUserListQuery,
  IUserResponse,
  IUserResponseList,
} from "../interfaces/user.interface";

export class UserPresenter {
  public static toResponse(user: IUser): IUserResponse {
    return {
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      Avatar: `${configs.AWS_URL}${user.Avatar}`,
      lastActivity: user.lastActivity,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  public static toResponseList(
    data: IUser[],
    total: number,
    query: IUserListQuery,
  ): IUserResponseList {
    return {
      data: data.map((item) => this.toResponse(item)),
      total,
      ...query,
    };
  }
}
