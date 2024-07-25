class CarRepository {
  // public async getList(): Promise<any> {
  //   // return await fsService.carsFromFile();
  // }
  // public async create(dto: Partial<ICar>): Promise<any> {
  //   // const { model, price, brand } = dto;
  //   // const cars = await fsService.carsFromFile();
  //   // const id = cars.length === 0 ? 1 : cars[cars.length - 1].id + 1;
  //   // const newCar = { id, model, price, brand };
  //   // cars.push(newCar);
  //   // await fsService.carsToFile(cars);
  //   // return newCar;
  // }
  // public async getCar(dto: number): Promise<any> {
  //   // const cars = await fsService.carsFromFile();
  //   // return cars.find((car) => car.id === dto);
  // }
  // public async delete(dto: number) {
  //   // const cars = await fsService.carsFromFile();
  //   // const index = cars.findIndex((car) => car.id === dto);
  //   // if (index === -1) {
  //   //   throw new ApiError("car not found", 404);
  //   // } else {
  //   //   cars.splice(index, 1);
  //   //   await fsService.carsToFile(cars);
  //   // }
  // }
}
export const carRepository = new CarRepository();
