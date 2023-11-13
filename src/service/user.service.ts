import { IUserDocument } from "../database";
import { GenericService } from "./generic.service";
import { UserRepository } from "../repository/user.repository";
import { IUserService } from "./interfaces/type";
import { IUserCreateDto } from "./interfaces/user.dto";

export class UserService
  extends GenericService<IUserDocument>
  implements IUserService
{
  constructor(private readonly _userRepository: UserRepository) {
    super(_userRepository);
  }

  private async isMobileNumberAvailable(
    mobileNumber: number
  ): Promise<boolean> {
    const isExists = await this._userRepository.isMobileNumberExists(
      mobileNumber
    );
    return isExists;
  }

  private async isAdmin(user: IUserCreateDto) {
    const mobileNumber = user.mobileNumber;
    if (mobileNumber == 7032300186) {
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

  async create(data: IUserCreateDto): Promise<boolean> {
    if (!data.displayName) {
      throw new Error("BadRequestError - displayName Not there!!");
    }

    if (!data.password) {
      throw new Error("BadRequestError - password Not there !!");
    }

    if (!data.username) {
      throw new Error("BadRequestError - username Not there !!");
    }

    if (!data.mobileNumber) {
      throw new Error("BadRequestError - mobileNumber Not there !!");
    }

    if (this.isValidMobileNumber(data.mobileNumber)) {
      throw new Error("BadRequestError - Invalid mobile Number !!");
    }
    const isAdmin = this.isAdmin(data);

    const userData: IUserDocument = {
      ...data,
      role: isAdmin ? "ADMIN" : "USER",
    };

    const isCreated = await this._userRepository.create(userData);

    return isCreated;
  }
}
