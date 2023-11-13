import { GenericRepository } from "./generic.repository";
import database, { IUserDocument } from "../database";

export class UserRepository extends GenericRepository<IUserDocument> {
  constructor() {
    super(database.userDB);
  }

  async isMobileNumberExists(mobileNumber: number): Promise<boolean> {
    const isAvailable = await database.userDB.find({ mobileNumber });
    return !!isAvailable.length;
  }
}
