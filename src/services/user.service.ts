import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../reposetories/user.reposetory";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async getUser(userID: string): Promise<IUser> {
    return await userRepository.getUser(userID);
  }
  public async deleteUser(dto: string) {
    return await userRepository.deleteUser(dto);
  }
  public async changeUser(userID: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.changeUser(userID, dto);
  }
}
export const userService = new UserService();
