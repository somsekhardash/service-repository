import { IUserDocument } from "../database";
import { IUserService } from "../service/interfaces/type";
import { UserService } from "../service/service";

export class UserController {
  constructor(private readonly _userService: IUserService) {}

  async createAUser(requestData: any) {
    return await this._userService.create(requestData.title);
  }

  async getAll(requestData: any) {
    try {
      let users = await this._userService.getAll();
      users = users.map((user: IUserDocument) => ({
        ...user,
        display: user.username,
      }));
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}
