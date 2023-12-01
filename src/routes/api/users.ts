import { body, param } from "express-validator";
import { UserController } from "../../controller/UserController";

import Route from "../../types/Route";
import { UserRole } from "../../enums/UserRole";

/**
 * @swagger
 * tags:
 *   name: Użytkownicy
 *   description: Operacje na użytkownikach
 */

const users: Route[] = [
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Pobierz wszystkich użytkowników
   *     tags: [Użytkownicy]
   *     responses:
   *       '200':
   *         description: Pomyślnie pobrano listę użytkowników
   *         content:
   *           application/json:
   *             example:
   *               - id: 1
   *                 username: example1
   *
   *               - id: 2
   *                 username: example2
   *
   *       '204':
   *         description: Brak użytkowników w bazie danych
   */
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
    secure: true,
    roles: [UserRole.MODERATOR],
  },

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Pobierz użytkownika o określonym ID
   *     tags: [Użytkownicy]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Pomyślnie pobrano użytkownika
   *         content:
   *           application/json:
   *             example:
   *               id: 1
   *               username: example1
   *
   *       '404':
   *         description: Użytkownik o podanym ID nie został znaleziony
   */
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN, UserRole.MODERATOR],
  },
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Usuń użytkownika o określonym ID
   *     tags: [Użytkownicy]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Pomyślnie usunięto użytkownika
   *         content:
   *           application/json:
   *             example:
   *               message: Użytkownik został usunięty
   *       '404':
   *         description: Użytkownik o podanym ID nie został znaleziony
   */
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN],
  },
];

export default users;
