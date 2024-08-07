import { configs } from "../configs/configs";
import { IUser } from "../interfaces/user.interface";

export class UserPresenter {
  public static toResponse(user: IUser): Partial<IUser> {
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
}
