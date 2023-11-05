import { UserRepository } from "./repository/repository";
import { UserController } from "./controller/controller";
import { UserService } from "./service/service";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

userController.createAUser({ title: "this is just a test" }).then((data) => {
  console.log(data);
});
