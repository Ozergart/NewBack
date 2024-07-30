import mongoose, { Schema } from "mongoose";

import { tokenActionTypeEnum } from "../enums/tokenTypes.enum";
import { IActionToken } from "../interfaces/action-token.interface";
import { UserModel } from "./user.model";

const actionTokenSchema = new Schema(
  {
    actionToken: { type: String, required: true },
    type: { type: String, required: true, enum: tokenActionTypeEnum },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionTokenModel = mongoose.model<IActionToken>(
  "action-tokens",
  actionTokenSchema,
);
