import { UserService } from "../service/service";

export class UserController {
    constructor(private readonly _userService: UserService) {}
  
    async createAUser(requestData: any) {
      return await this._userService.create(requestData.title);
    }
}
