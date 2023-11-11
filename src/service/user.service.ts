import { IUser } from "../database";
import { GenericService } from "./generic.service";
import { UserRepository } from "../repository/user.repository";

export class UserService extends GenericService<IUser> {
  constructor(private readonly _userRepository: UserRepository  ) {
    super(_userRepository);
  }
}
