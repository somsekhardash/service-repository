import { UserRepository } from "../../repository/repository";
import { UserService } from "../../service/service";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

const verifyHeaderToken = async ({ req, res }) => {
  try {
    let isAuthenticated = null;
    if (req?.headers && req?.headers?.authorization) {
      try {
        const token = req.headers.authorization;
        isAuthenticated = await userService.verifyAccessToken(token);
        console.log(isAuthenticated);
      } catch (error) {
        return { req, res, isAuthenticated };
      }
    }
    return { req, res, isAuthenticated };
  } catch (error) {
    throw new Error("Header Varification Failed");
  }
};

export { notFound, errorHandler, verifyHeaderToken };
