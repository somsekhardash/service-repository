import { IUser } from "../database";
import { GenericService } from "./generic.service";
import { UserRepository } from "../repository/user.repository";

export class UserService extends GenericService<IUser> {
  constructor(userRepository: UserRepository) {
    super(new UserRepository());
  }
}
