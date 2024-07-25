import mongoose, { Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { UserModel } from "./user.model";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TokenModel = mongoose.model<IToken>("tokens", tokenSchema);
