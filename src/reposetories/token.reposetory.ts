import { FilterQuery } from "mongoose";

import { IActionToken } from "../interfaces/action-token.interface";
import { IToken } from "../interfaces/token.interface";
import { TokenModel } from "../models/token.model";

class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await TokenModel.create(dto);
  }
  public async findByParams(params: FilterQuery<IToken>): Promise<IToken> {
    return await TokenModel.findOne(params);
  }
  public async deleteById(id: string): Promise<void> {
    await TokenModel.findByIdAndDelete({ _id: id });
  }
  public async deleteByUserId(userId: string): Promise<void> {
    await TokenModel.deleteMany({ _userId: userId });
  }
  public async deleteByParamsWithReturn(
    params: FilterQuery<IActionToken>,
  ): Promise<number> {
    const { deletedCount } = await TokenModel.deleteMany(params);
    return deletedCount;
  }
}
export const tokenRepository = new TokenRepository();
