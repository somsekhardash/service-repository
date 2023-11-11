import { IUser } from "../database";
import { UserService } from "../service/service";

export class UserController {
  constructor(private readonly _userService: UserService) {}

  async createAUser(requestData: any) {
    return await this._userService.create(requestData.title);
  }

  async getAll(requestData: any) {
    try {
      let users = await this._userService.getAll();
      users = users.map((user: IUser) => ({
        ...user,
        display: user.displayName,
      }));
      return {
        data: users,
        success: true,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
