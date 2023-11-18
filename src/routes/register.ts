import { body } from "express-validator";
import { RegisterController } from "../controller/RegisterController";
import Route from "../types/Route";

const register: Route[] = [
  {
    method: "post",
    route: "/register",
    controller: RegisterController,
    action: "handleNewUser",
    validation: [
      body("firstname").isString(),
      body("lastname").isString(),
      body("username").isString(),
      body("password").isString(),
    ],
  },
];

export default register;
