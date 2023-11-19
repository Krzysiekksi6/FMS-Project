import { body, param } from "express-validator";
import { UserController } from "../../controller/UserController";
import { UserDetailsController } from "../../controller/UserDetailsController";
import Route from "../../types/Route";
import { UserRole } from "../../enums/UserRole";

const users: Route[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
    secure: true,
    roles: [UserRole.USER]

  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN, UserRole.MODERATOR]
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [param("id").isInt()],
  },

  {
    method: "put",
    route: "/users/:id/details",
    controller: UserDetailsController,
    action: "addUserDetails",
    validation: [param("id").isInt()],
  },

  {
    method: "delete",
    route: "/users/:id/details",
    controller: UserDetailsController,
    action: "removeUserDetails",
    validation: [param("id").isInt()],
  },
];

export default users;
