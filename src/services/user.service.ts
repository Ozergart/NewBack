import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../reposetories/user.reposetory";
import { emailValidator } from "../validators/emailValidator";
import { passwordValidator } from "../validators/passwordValidator";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async getUser(userID: number): Promise<IUser> {
    return await userRepository.getUser(userID);
  }
  public async create(dto: IUser): Promise<IUser> {
    const { name, email, password } = dto;
    if (!name || !email || !password) {
      throw new ApiError("Object error", 400);
    } else if (!emailValidator(email)) {
      throw new ApiError("Invalid email", 400);
    } else if (!passwordValidator(password)) {
      throw new ApiError("Invalid password", 400);
    }
    return await userRepository.create(dto);
  }
  public async deleteUser(dto: number) {
    return await userRepository.deleteUser(dto);
  }
  public async changeUser(
    userID: number,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<IUser> {
    return await userRepository.changeUser(userID, name, email, password);
  }
}
export const userService = new UserService();
