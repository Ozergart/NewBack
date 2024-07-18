import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../reposetories/car.repository";

class CarService {
  public async getList(): Promise<any[]> {
    return await carRepository.getList();
  }
  public async create(dto: Partial<ICar>): Promise<ICar> {
    return await carRepository.create(dto);
  }
  public async getCar(dto: number): Promise<ICar> {
    return await carRepository.getCar(dto);
  }
  public async deleteCar(dto: number) {
    await carRepository.delete(dto);
  }
}
export const carService = new CarService();
