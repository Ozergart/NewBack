import { UploadedFile } from "express-fileupload";

import {
  IUser,
  IUserListQuery,
  IUserResponseList,
} from "../interfaces/user.interface";
import { UserPresenter } from "../presenters/user.presenter";
import { userRepository } from "../reposetories/user.reposetory";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: IUserListQuery): Promise<IUserResponseList> {
    const [users, total] = await userRepository.getList(query);
    return UserPresenter.toResponseList(users, total, query);
  }
  public async getUser(userID: string): Promise<IUser> {
    return await userRepository.getUser(userID);
  }
  public async deleteUser(dto: string) {
    return await userRepository.deleteUser(dto);
  }
  public async changeUser(userID: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.changeUser(userID, dto);
  }
  public async deleteAvatar(userID: string): Promise<IUser> {
    const user = await userRepository.getUser(userID);
    if (user.Avatar) {
      await s3Service.deleteFile(user.Avatar);
    }
    return await userRepository.changeUser(userID, { Avatar: "" });
  }
  public async uploadAvatar(
    userID: string,
    avatar: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getOneByParams({ _id: userID });
    if (user.Avatar) {
      await s3Service.deleteFile(user.Avatar);
    }
    const Avatar = await s3Service.uploadFile(userID, avatar, "avatar");
    const newUser = await userRepository.changeUser(userID, { Avatar });

    return newUser;
  }
}
export const userService = new UserService();
