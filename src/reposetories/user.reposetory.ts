import dayjs from "dayjs";
import { FilterQuery } from "mongoose";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public async getUser(userID: string): Promise<IUser> {
    return await UserModel.findById(userID);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await UserModel.create(dto);
  }
  public async deleteUser(dto: string): Promise<void> {
    await UserModel.deleteOne({ _id: dto });
  }
  public async changeUser(userID: string, dto: Partial<IUser>): Promise<IUser> {
    const user = await UserModel.findByIdAndUpdate(userID, dto, {
      returnDocument: "after",
    });
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }
  public async getOneByParams(params: Partial<IUser>): Promise<IUser> {
    return await UserModel.findOne(params);
  }
  public async getByParams(params: FilterQuery<IUser>): Promise<IUser[]> {
    return await UserModel.find(params);
  }
  public async updateLastActivityById(id: string) {
    await UserModel.findByIdAndUpdate(id, { lastActivity: dayjs() });
  }
  public async deleteTokens(id: string): Promise<void> {
    await UserModel.updateOne(
      { _id: id },
      {
        $unset: {
          "tokens.accessToken": "",
          "tokens.refreshToken": "",
        },
      },
    );
  }
}
export const userRepository = new UserRepository();
