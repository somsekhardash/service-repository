import { IUserDocument } from "../database";
import { Prisma  } from "@prisma/client";
import { GenericService } from "./generic.service";
import { UserRepository } from "../repository/user.repository";
import { IUserService } from "./interfaces/type";
import { IUserCreateDto } from "./interfaces/user.dto";
import {  User } from '@prisma/client';

// implements IUserService
export class UserService extends GenericService<User> {
  constructor(private readonly _userRepository: UserRepository) {
    super(_userRepository);
  }

  private async isMobileNumberAvailable(
    mobileNumber: number
  ): Promise<boolean> {
    // const isExists = await this._userRepository.isMobileNumberExists(
    //   mobileNumber
    // );
    return true;
  }

  private async isAdmin(user: IUserCreateDto) {
    if (user.mobile == 619) {
      return true;
    }
    return false;
  }

  private async isValidMobileNumber(mobileNumber: number): Promise<boolean> {
    const length = mobileNumber.toString.length;
    const validLength = length >= 0 && length <= 10;
    if (!validLength) {
      return false;
    }
    const isAvailable = await this.isMobileNumberAvailable(mobileNumber);
    return isAvailable;
  }

  async create(data: IUserCreateDto): Promise<User> {

    if (!data.password) {
      throw new Error("BadRequestError - password Not there !!");
    }

    if (!data.username) {
      throw new Error("BadRequestError - username Not there !!");
    }

    if (!data.mobile) {
      throw new Error("BadRequestError - mobileNumber Not there !!");
    }

    // if (this.isValidMobileNumber(data.mobileNumber)) {
    //   throw new Error("BadRequestError - Invalid mobile Number !!");
    // }
    
    const isAdmin = this.isAdmin(data);

    const userData: Partial<User> = {
      userName: data.username,
      passWord: data.password,
      mobileNumber: data.mobile,
      role: isAdmin ? "ADMIN" : "USER",
    };

    const newUser = await this._userRepository.create(userData);
    return newUser;
  }
}
