import { FilterQuery } from "mongoose";

import { IOldPassword } from "../interfaces/old.password.interface";
import { oldPassModel } from "../models/old.password.model";

class PasswordRepository {
  public async create(dto: Partial<IOldPassword>): Promise<void> {
    await oldPassModel.create(dto);
  }
  public async findByParams(params: FilterQuery<IOldPassword>) {
    return await oldPassModel.find(params);
  }
  public async deleteByParamsWithReturn(
    params: FilterQuery<IOldPassword>,
  ): Promise<number> {
    const { deletedCount } = await oldPassModel.deleteMany(params);
    return deletedCount;
  }
}
export const passwordRepository = new PasswordRepository();
