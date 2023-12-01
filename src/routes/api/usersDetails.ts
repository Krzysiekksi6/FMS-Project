import { param } from "express-validator";
import { UserRole } from "../../enums/UserRole";
import Route from "../../types/Route";
import { UserDetailsController } from "../../controller/UserDetailsController";

/**
 * @swagger
 * tags:
 *   name: Szczegóły Użytkownika
 *   description: Operacje na szczegółach użytkownika
 */
const usersDetails: Route[] = [
  /**
 * @swagger
 * /users/{id}/details:
 *   put:
 *     summary: Dodaj szczegóły użytkownika
 *     tags: [Szczegóły Użytkownika]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dane szczegółów użytkownika
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             age: 25
 *             weight: 70
 *             height: 175
 *     responses:
 *       '201':
 *         description: Pomyślnie dodano szczegóły użytkownika
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               age: 25
 *               weight: 70
 *               height: 175
 *               bmi: 22.86
 *               bmr: 1762.5
 *       '400':
 *         description: Nieprawidłowe dane szczegółów użytkownika
 *       '404':
 *         description: Użytkownik o podanym ID nie został znaleziony
 *       '500':
 *         description: Wewnętrzny błąd serwera

 *   delete:
 *     summary: Usuń szczegóły użytkownika
 *     tags: [Szczegóły Użytkownika]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Pomyślnie usunięto szczegóły użytkownika
 *         content:
 *           application/json:
 *             example:
 *               message: Szczegóły użytkownika zostały usunięte
 *       '404':
 *         description: Użytkownik o podanym ID nie został znaleziony
 *       '500':
 *         description: Wewnętrzny błąd serwera
 */
  {
    method: "put",
    route: "/users/:id/details",
    controller: UserDetailsController,
    action: "addUserDetails",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN, UserRole.MODERATOR],
  },

  {
    method: "delete",
    route: "/users/:id/details",
    controller: UserDetailsController,
    action: "removeUserDetails",
    validation: [param("id").isInt()],
    secure: true,
    roles: [UserRole.ADMIN],
  },
];

export default usersDetails;
