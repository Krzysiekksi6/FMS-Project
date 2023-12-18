import { param, body } from "express-validator";
import Route from "../../types/Route";
import { DietCategoryController } from "../../controller/diet/DietCategoryController";

const dietCategory: Route[] = [
  {
    method: "get",
    route: "/diet-categories",
    controller: DietCategoryController,
    action: "getAllDietCategories",
    validation: [],
    secure: false,
  },
  {
    method: "get",
    route: "/diet-categories/:id",
    controller: DietCategoryController,
    action: "getDietCategoryById",
    validation: [param("id").isInt()],
    secure: false,
  },
  {
    method: "post",
    route: "/diet-categories",
    controller: DietCategoryController,
    action: "createDietCategory",
    validation: [
      body("name").isString().notEmpty(),
      body("description").isString().notEmpty(),
    ],
    secure: false,
  },
  {
    method: "put",
    route: "/diet-categories/:id",
    controller: DietCategoryController,
    action: "updateDietCategory",
    validation: [
      param("id").isInt(),
      body("name").isString().notEmpty(),
      body("description").isString().notEmpty(),
    ],
    secure: false,
  },
  {
    method: "delete",
    route: "/diet-categories/:id",
    controller: DietCategoryController,
    action: "deleteDietCategory",
    validation: [param("id").isInt()],
    secure: false,
  },
];

export default dietCategory;

/**
 * @swagger
 * tags:
 *   name: Kontroler kategorii planów żywieniowych
 *   description: Operacje związane z zarządzaniem kategoriami diet
 */

/**
 * @swagger
 * /diet-categories:
 *   get:
 *     summary: Pobieranie wszystkich dostępnych kategorii diet
 *     tags: [Kontroler kategorii planów żywieniowych]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich kategorii diet
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /diet-categories/{id}:
 *   get:
 *     summary: Pobieranie kategorii diety o określonym identyfikatorze
 *     tags: [Kontroler kategorii planów żywieniowych]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator kategorii diety
 *     responses:
 *       '200':
 *         description: Pobranie kategorii diety o określonym identyfikatorze
 *       '400':
 *         description: Nieprawidłowy identyfikator kategorii diety
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /diet-categories:
 *   post:
 *     summary: Tworzenie nowej kategorii diety
 *     tags: [Kontroler kategorii planów żywieniowych]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Utworzenie nowej kategorii diety
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /diet-categories/{id}:
 *   put:
 *     summary: Aktualizacja kategorii diety o określonym identyfikatorze
 *     tags: [Kontroler kategorii planów żywieniowych]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator kategorii diety
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Aktualizacja kategorii diety o określonym identyfikatorze
 *       '400':
 *         description: Nieprawidłowe dane wejściowe lub identyfikator kategorii diety
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /diet-categories/{id}:
 *   delete:
 *     summary: Usunięcie kategorii diety o określonym identyfikatorze
 *     tags: [Kontroler kategorii planów żywieniowych]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator kategorii diety
 *     responses:
 *       '200':
 *         description: Usunięcie kategorii diety o określonym identyfikatorze
 *       '400':
 *         description: Nieprawidłowy identyfikator kategorii diety
 *       '500':
 *         description: Błąd serwera
 */

