import joi from "joi";

import { CarBrandsEnum } from "../enums/car-brands.enum";

export class CarValidators {
  private static model = joi.string().required().trim();
  private static price = joi.string().required();
  private static brand = joi
    .string()
    .required()
    .valid(...Object.values(CarBrandsEnum));

  public static createCar = joi.object({
    model: this.model,
    price: this.price,
    brand: this.brand,
  });
}
