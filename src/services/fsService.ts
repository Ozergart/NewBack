import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const patchToUsers = path.join(process.cwd(), "src", "usersFS.json");

class FsService {
  public async usersToFile(users: IUser[]): Promise<void> {
    await fs.writeFile(patchToUsers, JSON.stringify(users, null, 2), "utf8");
    console.log("saved");
  }
  public async usersFromFile(): Promise<IUser[]> {
    try {
      const data = await fs.readFile(patchToUsers, "utf8");
      return JSON.parse(data);
    } catch (e) {
      console.log(e.message);
    }
  }
}
export const fsService = new FsService();
