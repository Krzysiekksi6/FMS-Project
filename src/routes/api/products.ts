import { param, body } from "express-validator";
import Route from "../../types/Route";
import { ProductController } from "../../controller/product/ProductController";
import { UserRole } from "../../enums/UserRole";

const products: Route[] = [
  {
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "getAllProducts",
    validation: [],
    secure: false,
    // roles: []
  },
  {
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    action: "getOneProduct",
    validation: [param("id").isInt()],
    secure: false,
    // roles: []
  },
  {
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "addProduct",
    validation: [],
    secure: false,
    // roles: []
  },
  {
    method: "put",
    route: "/products/:id/edit",
    controller: ProductController,
    action: "editProduct",
    validation: [param("id").isInt(), body("name").isString()],
    secure: false,
    // roles: []
  },
  {
    method: "delete",
    route: "/products/:id/delete",
    controller: ProductController,
    action: "removeProduct",
    validation: [param("id").isInt()],
    secure: false,
    // roles: []
  },
];

export default products;

/**
 * @swagger
 * tags:
 *   name: Kontroler produktów
 *   description: Operacje związane z zarządzaniem produktami
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Pobieranie wszystkich produktów
 *     tags: [Kontroler produktów]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich produktów
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Pobieranie jednego produktu na podstawie identyfikatora
 *     tags: [Kontroler produktów]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identyfikator produktu
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Pobranie danych jednego produktu
 *       '404':
 *         description: Produkt o podanym identyfikatorze nie istnieje
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Dodawanie nowego produktu
 *     tags: [Kontroler produktów]
 *     responses:
 *       '201':
 *         description: Dodanie nowego produktu
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /products/{id}/edit:
 *   put:
 *     summary: Edycja produktu na podstawie identyfikatora
 *     tags: [Kontroler produktów]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identyfikator produktu
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
 *         description: Edycja danych produktu
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '404':
 *         description: Produkt o podanym identyfikatorze nie istnieje
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /products/{id}/delete:
 *   delete:
 *     summary: Usuwanie produktu na podstawie identyfikatora
 *     tags: [Kontroler produktów]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identyfikator produktu
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Usunięcie produktu
 *       '404':
 *         description: Produkt o podanym identyfikatorze nie istnieje
 *       '500':
 *         description: Błąd serwera
 */


