import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../reposetories/car.repository";

class CarService {
  public async getList(): Promise<any[]> {
    return await carRepository.getList();
  }
  public async create(dto: Partial<ICar>): Promise<ICar> {
    return await carRepository.create(dto);
  }
}
export const carService = new CarService();
