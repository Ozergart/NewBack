import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { fsService } from "../services/fsService";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await fsService.usersFromFile();
  }

  public async getUser(userID: number): Promise<IUser> {
    await fsService.usersFromFile();
    const users = await fsService.usersFromFile();
    const user = users.find((user) => user.id === userID);
    if (!user) {
      throw new ApiError("User not found", 404);
    } else {
      return user;
    }
  }
  public async create(dto: IUser): Promise<IUser> {
    const users = await fsService.usersFromFile();
    const index = users.findIndex((user) => user.email === dto.email);
    if (index !== -1) {
      throw new ApiError("user with this email already exists", 409);
    } else {
      const newUser = {
        id: users[users.length - 1].id + 1,
        name: dto.name,
        email: dto.email,
        password: dto.password,
      };
      users.push(newUser);
      await fsService.usersToFile(users);
      return newUser;
    }
  }
  public async deleteUser(dto: number): Promise<number> {
    const users = await fsService.usersFromFile();
    const index = users.findIndex((user) => user.id === dto);
    if (index === -1) {
      throw new ApiError("user not found", 404);
    } else {
      users.splice(index, 1);
      await fsService.usersToFile(users);
      return 1;
    }
  }
  public async changeUser(
    userID: number,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<IUser> {
    const users = await fsService.usersFromFile();
    const user = users.find((user) => user.id === userID);
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      throw new ApiError("user with this email already exists", 409);
    } else {
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      if (name) {
        user.name = name;
      }
      await fsService.usersToFile(users);
      return user;
    }
  }
}
export const userRepository = new UserRepository();
