import { IUserDocument } from "../database";
import { Prisma } from "@prisma/client";
import { GenericService } from "./generic.service";
import { UserRepository } from "../repository/user.repository";
import { IUserService } from "./interfaces/type";
import { IUserCreateDto } from "./interfaces/user.dto";
import { User } from "@prisma/client";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

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

  private isAdmin(user: IUserCreateDto) {
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

  async getUserByMobile(mobileNumber: number) {
    const dbUser = await this._userRepository.find({ mobileNumber });
    return dbUser[0];
  }

  async getUserByToken(refreshToken: string) {
    const dbUser = await this._userRepository.find({ refreshToken });
    return dbUser[0];
  }

  async getAccessToken(refreshToken: string) {
    // const { mobile, password } = payload;
    const user = await this.getUserByToken(refreshToken);
    if (!user) throw new Error("User not found");

    const decodedToken = await this.verifyRefreshToken(refreshToken);

    if(!decodedToken?.username) {
      throw new Error("Invalid User !!");
    }
    const accessToken = JWT.sign(
      { username: user.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return {accessToken}
  }

  async logoutUser(refreshToken: string) {
    const user = await this.getUserByToken(refreshToken);
    if (!user) throw new Error("User not found");
    const updatedUser = this._userRepository.update(user.id, {refreshToken: null});

    if (updatedUser) {
      return true;
    } else throw new Error("Auth Error");
  }

  async getUserToken(payload: Partial<IUserCreateDto>) {
    const { mobile, password } = payload;
    const user = await this.getUserByMobile(mobile);
    if (!user) throw new Error("User not found");
    const hashedPassword = this.getHashedValue(password, user.salt);
    if (hashedPassword !== user.passWord)
      throw new Error("Password is not correct");
    // genarate new token
    const accessToken = JWT.sign(
      { username: user.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = JWT.sign(
      { username: user.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const updatedUser = await this._userRepository.update(user.id, {refreshToken});

    if (updatedUser) {
      return { accessToken, refreshToken, updatedUser };
    } else throw new Error("Auth Error");
  }

  async verifyAccessToken(token: string) {
    try {
      return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);  
    } catch (error) {
      throw new Error("Unable to decode the Token");
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      return JWT.verify(token, process.env.REFRESH_TOKEN_SECRET);  
    } catch (error) {
      throw new Error("Unable to decode the Token");
    }
  }

  getHashedValue(value: string, secret: string) {
    return createHmac("sha256", secret).update(value).digest("hex");
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
    try {
      const secret = randomBytes(32).toString("hex");
      const hashedPassword = this.getHashedValue(data.password, secret);
  
      const userData: Partial<User> = {
        userName: data.username,
        passWord: hashedPassword,
        mobileNumber: data.mobile,
        salt: secret,
        role: "USER",
      };
  
      const newUser = await this._userRepository.create(userData);
      return newUser;
    } catch (error) {
        console.log(error);
        throw new Error('not able to create a new User')
    } 
   
  }
}
