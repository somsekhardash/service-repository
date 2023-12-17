import { GenericRepository } from "./generic.repository";
import database, { IUserDocument } from "../database";
import {  User } from '@prisma/client';

export class UserRepository extends GenericRepository<User> {
  constructor() {
    super('User');
  }

  // async isMobileNumberExists(mobileNumber: number): Promise<boolean> {
  //   const isAvailable = await database.userDB.find({ mobileNumber });
  //   return !!isAvailable.length;
  // }
}
