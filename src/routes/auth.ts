import { body } from "express-validator";
import { AuthController } from "../controller/AuthController";
import Route from "../types/Route";

const auth: Route[] = [
  {
    method: "post",
    route: "/auth",
    controller: AuthController,
    action: "handleLogin",
    validation: [body("username").isString(), body("password").isString()],
  },
];

export default auth;
