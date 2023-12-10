import { param, body } from "express-validator";
import Route from "../../types/Route";
import { ProductCategoryController } from "../../controller/product/ProductCategoryController";
import { UserRole } from "../../enums/UserRole";

const productsCategory: Route[] = [
  {
    method: "get",
    route: "/productsCategory",
    controller: ProductCategoryController,
    action: "getAllCategories",
    validation: [],
    secure: false,
    // roles: []
  },
  {
    method: "get",
    route: "/productsCategory/:id",
    controller: ProductCategoryController,
    action: "getOneCategory",
    validation: [param("id").isInt()],
    secure: false,
    // roles: []
  },
  {
    method: "post",
    route: "/productsCategory",
    controller: ProductCategoryController,
    action: "addCategory",
    validation: [body("name").isString()],
    secure: false,
    // roles: []
  },
  {
    method: "put",
    route: "/productsCategory/:id/edit",
    controller: ProductCategoryController,
    action: "editCategory",
    validation: [body("name").isString()],
    secure: false,
    // roles: []
  },
  {
    method: "delete",
    route: "/productsCategory/:id/delete",
    controller: ProductCategoryController,
    action: "removedCategory",
    validation: [param("id").isInt()],
    secure: false,
    // roles: []
  },
];

export default productsCategory;

/**
 * @swagger
 * tags:
 *   name: Kontroler kategorii produktów
 *   description: Operacje związane z zarządzaniem kategoriami produktów
 */

/**
 * @swagger
 * /productsCategory:
 *   get:
 *     summary: Pobieranie wszystkich kategorii produktów
 *     tags: [Kontroler kategorii produktów]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich kategorii produktów
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /productsCategory/{id}:
 *   get:
 *     summary: Pobieranie jednej kategorii produktów na podstawie identyfikatora
 *     tags: [Kontroler kategorii produktów]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identyfikator kategorii produktów
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pobranie danych jednej kategorii produktów
 *       '404':
 *         description: Kategoria produktu o podanym identyfikatorze nie istnieje
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /productsCategory:
 *   post:
 *     summary: Dodawanie nowej kategorii produktów
 *     tags: [Kontroler kategorii produktów]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Dodanie nowej kategorii produktów
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /productsCategory/{id}/edit:
 *   put:
 *     summary: Edycja kategorii produktów na podstawie identyfikatora
 *     tags: [Kontroler kategorii produktów]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identyfikator kategorii produktów
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Edycja danych kategorii produktów
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '404':
 *         description: Kategoria produktu o podanym identyfikatorze nie istnieje
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /productsCategory/{id}/delete:
 *   delete:
 *     summary: Usuwanie kategorii produktów na podstawie identyfikatora
 *     tags: [Kontroler kategorii produktów]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identyfikator kategorii produktów
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Usunięcie kategorii produktów
 *       '404':
 *         description: Kategoria produktu o podanym identyfikatorze nie istnieje
 *       '500':
 *         description: Błąd serwera
 */

