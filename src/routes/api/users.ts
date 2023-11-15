import { body, param } from "express-validator";
import { UserController } from "../../controller/UserController";

const users = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "registerUser",
    validation: [
      body("firstname").isString(),
      body("lastname").isString(),
      body("username").isString(),
      body("password").isString(),
    ],
  },
  {
    method: "post",
    route: "/auth",
    controller: UserController,
    action: "handleLogin",
    validation: [body("username").isString(), body("password").isString()],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [param("id").isInt()],
  },
];

export default users;
