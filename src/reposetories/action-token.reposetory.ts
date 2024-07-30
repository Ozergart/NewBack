import { FilterQuery } from "mongoose";

import { IActionToken } from "../interfaces/action-token.interface";
import { ActionTokenModel } from "../models/action-token.model";

class ActionTokenRepository {
  public async createActionToken(dto: IActionToken): Promise<IActionToken> {
    return await ActionTokenModel.create(dto);
  }
  public async findByActionToken(actionToken: string): Promise<IActionToken> {
    return await ActionTokenModel.findOne({ actionToken });
  }
  public async deleteByParams(
    params: FilterQuery<IActionToken>,
  ): Promise<void> {
    await ActionTokenModel.deleteMany(params);
  }
}
export const actionTokenRepository = new ActionTokenRepository();
