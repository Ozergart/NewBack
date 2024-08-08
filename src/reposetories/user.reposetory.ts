import dayjs from "dayjs";
import { FilterQuery } from "mongoose";

import { ApiError } from "../errors/api-error";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = { isVerified: true };
    const limit = 20;
    if (query.search) {
      filterObj.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }
    const sortField = query.orderBy || "name";
    const sortOrder = query.order === "asc" ? 1 : -1; // По умолчанию "desc"

    const sortObj: any = { [sortField]: sortOrder };
    const skip = (query.page - 1) * limit;
    return await Promise.all([
      UserModel.find(filterObj).limit(limit).skip(skip).sort(sortObj),
      UserModel.countDocuments(filterObj),
    ]);
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
