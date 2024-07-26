import { ICar } from "../interfaces/car.interface";
import { CarModel } from "../models/car.model";

class CarRepository {
  public async getList(): Promise<ICar[]> {
    return await CarModel.find();
  }
  public async create(dto: ICar): Promise<ICar> {
    return await CarModel.create(dto);
  }
  public async getCar(dto: string): Promise<ICar> {
    return await CarModel.findOne({ _id: dto });
  }
  public async delete(dto: string) {
    await CarModel.deleteOne({ _id: dto });
  }
}
export const carRepository = new CarRepository();
