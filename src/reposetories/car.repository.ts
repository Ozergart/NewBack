import { ICar } from "../interfaces/car.interface";
import { fsService } from "../services/fsService";

class CarRepository {
  public async getList(): Promise<ICar[]> {
    return await fsService.carsFromFile();
  }
  public async create(dto: Partial<ICar>): Promise<ICar> {
    const { model, price, brand } = dto;
    const cars = await fsService.carsFromFile();
    const id = cars[cars.length - 1].id + 1;
    const newCar = { id, model, price, brand };
    cars.push(newCar);
    await fsService.carsToFile(cars);
    return newCar;
  }
}
export const carRepository = new CarRepository();
