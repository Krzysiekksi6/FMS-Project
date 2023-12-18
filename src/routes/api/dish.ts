import { param } from "express-validator";
import Route from "../../types/Route";
import { DishController } from "../../controller/dish/DishController";

const dish: Route[] = [
  {
    method: "get",
    route: "/dish",
    controller: DishController,
    action: "getAllDishes",
    validation: [],
    secure: false,
  },
  {
    method: "get",
    route: "/dish/:id",
    controller: DishController,
    action: "getDishById",
    validation: [param("id").isInt()],
    secure: false,
  },
  {
    method: "post",
    route: "/dish",
    controller: DishController,
    action: "addDish",
    validation: [],
    secure: false,
  },
  {
    method: "delete",
    route: "/dish/:id",
    controller: DishController,
    action: "deleteDish",
    validation: [],
    secure: false,
  },
];

export default dish;

/**
 * @swagger
 * tags:
 *   name: Kontroler dań
 *   description: Operacje związane z zarządzaniem daniami
 */

/**
 * @swagger
 * /dish:
 *   get:
 *     summary: Pobieranie wszystkich dostępnych dań
 *     tags: [Kontroler dań]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich dań
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /dish/{id}:
 *   get:
 *     summary: Pobieranie dania o określonym identyfikatorze
 *     tags: [Kontroler dań]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator dania
 *     responses:
 *       '200':
 *         description: Pobranie dania o określonym identyfikatorze
 *       '400':
 *         description: Nieprawidłowy identyfikator dania
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /dish:
 *   post:
 *     summary: Dodawanie nowego dania
 *     tags: [Kontroler dań]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Tu dodaj definicję pól dla nowego dania
 *     responses:
 *       '201':
 *         description: Utworzenie nowego dania
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /dish/{id}:
 *   delete:
 *     summary: Usunięcie dania o określonym identyfikatorze
 *     tags: [Kontroler dań]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator dania
 *     responses:
 *       '200':
 *         description: Usunięcie dania o określonym identyfikatorze
 *       '400':
 *         description: Nieprawidłowy identyfikator dania
 *       '500':
 *         description: Błąd serwera
 */

