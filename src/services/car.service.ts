import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../reposetories/car.repository";

class CarService {
  public async getList(): Promise<ICar[]> {
    return await carRepository.getList();
  }
  public async create(dto: ICar): Promise<ICar> {
    return await carRepository.create(dto);
  }
  public async getCar(dto: string): Promise<ICar> {
    return await carRepository.getCar(dto);
  }
  public async deleteCar(dto: string) {
    await carRepository.delete(dto);
  }
}
export const carService = new CarService();
