import { body, param } from "express-validator";
import { AuthController } from "../../controller/AuthController";
const auth = [
  {
    method: "post",
    route: "/auth",
    controller: AuthController,
    action: "handleLogin",
    validation: [body("username").isString(), body("password").isString()],
  },
];

export default auth;
