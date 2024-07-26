import mongoose, { Schema } from "mongoose";

import { CarBrandsEnum } from "../enums/car-brands.enum";
import { ICar } from "../interfaces/car.interface";

const carSchema = new Schema<ICar>(
  {
    model: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, enum: CarBrandsEnum, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const CarModel = mongoose.model<ICar>("cars", carSchema);
