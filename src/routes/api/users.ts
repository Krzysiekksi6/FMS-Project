import { param } from "express-validator";
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
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN, UserRole.MODERATOR],
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Pobiera informacje o jednym użytkowniku na podstawie identyfikatora
     *     tags: [Kontroler użytkowników]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Identyfikator użytkownika
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: Udane pobranie informacji o użytkowniku
     *         content:
     *           application/json:
     *             example:
     *               user: user1
     *       '401':
     *         description: Nieautoryzowany dostęp
     *       '403':
     *         description: Brak wymaganych uprawnień do wykonania tej operacji
     *       '404':
     *         description: Użytkownik o podanym identyfikatorze nie istnieje
     */
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [param("id").isInt()],
    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Usuwa użytkownika na podstawie identyfikatora
     *     tags: [Kontroler użytkowników]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Identyfikator użytkownika do usunięcia
     *         schema:
     *           type: integer
     *     responses:
     *       '204':
     *         description: Sukces usunięcia użytkownika
     *       '401':
     *         description: Nieautoryzowany dostęp
     *       '403':
     *         description: Brak wymaganych uprawnień do wykonania tej operacji
     *       '404':
     *         description: Użytkownik o podanym identyfikatorze nie istnieje
     */
  },
  {
    method: "put",
    route: "/users/:id/details",
    controller: UserDetailsController,
    action: "addUserDetails",
    validation: [param("id").isInt()],
    /**
     * @swagger
     * /users/{id}/details:
     *   put:
     *     summary: Dodaje szczegóły użytkownika na podstawie identyfikatora
     *     tags: [Kontroler użytkowników]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Identyfikator użytkownika
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: Udane dodanie szczegółów użytkownika
     *         content:
     *           application/json:
     *             example:
     *               message: Szczegóły użytkownika dodane pomyślnie
     *       '401':
     *         description: Nieautoryzowany dostęp
     *       '403':
     *         description: Brak wymaganych uprawnień do wykonania tej operacji
     *       '404':
     *         description: Użytkownik o podanym identyfikatorze nie istnieje
     */
  },
  {
    method: "delete",
    route: "/users/:id/details",
    controller: UserDetailsController,
    action: "removeUserDetails",
    validation: [param("id").isInt()],
    /**
     * @swagger
     * /users/{id}/details:
     *   delete:
     *     summary: Usuwa szczegóły użytkownika na podstawie identyfikatora
     *     tags: [Kontroler użytkowników]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: Identyfikator użytkownika
     *         schema:
     *           type: integer
     *     responses:
     *       '204':
     *         description: Sukces usunięcia szczegółów użytkownika
     *       '401':
     *         description: Nieautoryzowany dostęp
     *       '403':
     *         description: Brak wymaganych uprawnień do wykonania tej operacji
     *       '404':
     *         description: Użytkownik o podanym identyfikatorze nie istnieje
     */
  },
];

export default users;
