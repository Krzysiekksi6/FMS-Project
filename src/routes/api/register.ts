import { body, param } from "express-validator";
import { RegisterController } from "../../controller/RegisterController";

const register = [
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
