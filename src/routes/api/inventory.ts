import { param } from "express-validator";
import Route from "../../types/Route";
import { InventoryController } from "../../controller/inventory/InventoryController";

const inventory: Route[] = [
  {
    method: "get",
    route: "/inventory",
    controller: InventoryController,
    validation: [],
    action: "getAllItems",
    secure: false,
  },
];

export default inventory;

/**
 * @swagger
 * tags:
 *   name: Kontroler produktów w spiżarni
 *   description: Operacje związane z zarządzaniem przedmiotami w spiżarni
 */

/**
 * @swagger
 * /addItem:
 *   post:
 *     summary: Dodawanie nowego przedmiotu do spiżarni
 *     tags: [Kontroler produktów w spiżarni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pantryId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               purchaseDate:
 *                 type: string
 *                 format: date-time
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *               quantity:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Utworzenie nowego przedmiotu w spiżarni
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '404':
 *         description: Spiżarnia lub produkt nie znaleziony
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /getOneItem/{id}:
 *   get:
 *     summary: Pobieranie informacji o pojedynczym przedmiocie z spiżarni
 *     tags: [Kontroler produktów w spiżarni]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator przedmiotu w spiżarni
 *     responses:
 *       '200':
 *         description: Pobranie informacji o przedmiocie z spiżarni
 *       '404':
 *         description: Przedmiot w spiżarni nie znaleziony
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /editItem/{id}:
 *   put:
 *     summary: Edycja informacji o przedmiocie w spiżarni
 *     tags: [Kontroler produktów w spiżarni]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator przedmiotu w spiżarni
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseDate:
 *                 type: string
 *                 format: date-time
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *               quantity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Edycja informacji o przedmiocie w spiżarni
 *       '404':
 *         description: Przedmiot w spiżarni nie znaleziony
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /removeItem/{id}:
 *   delete:
 *     summary: Usunięcie przedmiotu ze spiżarni
 *     tags: [Kontroler produktów w spiżarni]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator przedmiotu w spiżarni
 *     responses:
 *       '200':
 *         description: Usunięcie przedmiotu ze spiżarni
 *       '404':
 *         description: Przedmiot w spiżarni nie znaleziony
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Pobieranie wszystkich produktów ze spiżarni
 *     tags: [Kontroler produktów w spiżarni]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich produktów ze spiżarni
 *       '500':
 *         description: Błąd serwera
 */
