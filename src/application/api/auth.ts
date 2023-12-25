import express from "express";
import { UserRepository } from "../../repository/repository";
import { UserService } from "../../service/service";
import { IUserCreateDto } from "../../service/interfaces/user.dto";
const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.get("/", (req, res) => {
  res.json({
    message: "API Auth is Live",
  });
});

router.get("/refresh", async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json({ success: false, message: "not able to auth" });
  
  const accessToken = await userService.getAccessToken(refreshToken);
  if (accessToken) res.json({ success: true, accessToken });
  else
    res.status(500).json({ success: false, message: "somsething Went wrong" });
});


router.post("/login", async (req, res) => {
  const getTokenInput = {
    mobile: req.body.mobile,
    password: req.body.password,
  };
  const { accessToken, refreshToken, updatedUser } = await userService.getUserToken(
    getTokenInput
  );
  if (!accessToken || !refreshToken)
    res.status(401).json({ success: false, message: "not able to auth" });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ success: true, accessToken, user:{
    userName: updatedUser.userName
  } });
});

router.post("/logout", async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res
      .status(401)
      .json({ success: false, message: "not able to auth" });
  }
  const response = await userService.logoutUser(refreshToken);
  res.clearCookie("refreshToken", { httpOnly: true });
  response
    ? res.json({ success: true })
    : res
        .status(500)
        .json({ success: false, message: "somsething Went wrong" });
});

router.post("/signup", async (req, res) => {
  const userInput: IUserCreateDto = {
    mobile: req.body.mobileNumber,
    username: req.body.userName,
    password: req.body.passWord,
  };
  const user = await userService.create(userInput);

  if (user) res.status(201).json({ success: true });
  else
    res.status(500).json({ success: false, message: "somsething Went wrong" });
});

router.get("/", (req, res) => {
  res.json({
    message: "API Auth is Live",
  });
});

export default router;
