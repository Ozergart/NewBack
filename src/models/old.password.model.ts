import mongoose, { Schema } from "mongoose";

import { IOldPassword } from "../interfaces/old.password.interface";
import { UserModel } from "./user.model";

const oldPasswordScheme = new Schema(
  {
    oldPassword: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const oldPassModel = mongoose.model<IOldPassword>(
  "oldPass",
  oldPasswordScheme,
);
