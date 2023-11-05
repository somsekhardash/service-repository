import { GenericRepository } from "./generic.repository";
import database, { IUser } from "../database";

export class UserRepository extends GenericRepository<IUser> {
  constructor() {
    super(database.userDB);
  }
}
