import { body, param } from "express-validator";
import { UserController } from "../../controller/UserController";
import { UserDetailsController } from "../../controller/UserDetailsController";
import Route from "../../types/Route";
import { UserRole } from "../../enums/UserRole";

/**
 * @swagger
 * tags:
 *   name: Kontroler użytkowników
 *   description: Operacje związane z zarządzaniem danymi użytkowników
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Pobiera informacje o wszystkich użytkownikach
 *     tags: [Kontroler użytkowników]
 *     responses:
 *       '200':
 *         description: Udane pobranie informacji o użytkownikach
 *         content:
 *           application/json:
 *             example:
 *               users: [user1, user2, ...]
 *       '401':
 *         description: Nieautoryzowany dostęp
 */

const users: Route[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
    secure: false,
    // secure: true,
    // roles: [UserRole.MODERATOR],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN, UserRole.MODERATOR],
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
