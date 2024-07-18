import fs from "node:fs/promises";
import path from "node:path";

import { ICar } from "../interfaces/car.interface";
import { IUser } from "../interfaces/user.interface";

const patchToUsers = path.join(process.cwd(), "src", "usersFS.json");
const patchToCars = path.join(process.cwd(), "src", "carsFS.json");

class FsService {
  public async usersToFile(users: IUser[]): Promise<void> {
    await fs.writeFile(patchToUsers, JSON.stringify(users, null, 2), "utf8");
    console.log("saved");
  }
  public async usersFromFile(): Promise<IUser[]> {
    const data = await fs.readFile(patchToUsers, "utf8");
    return JSON.parse(data);
  }
  public async carsToFile(cars: ICar[]) {
    await fs.writeFile(patchToCars, JSON.stringify(cars), "utf8");
    console.log("saved");
  }
  public async carsFromFile(): Promise<ICar[]> {
    const data = await fs.readFile(patchToCars, "utf8");
    return JSON.parse(data);
  }
}
export const fsService = new FsService();
