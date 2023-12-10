import { ShoopingListController } from "../../controller/shoppingList/ShoppingListController";
import Route from "../../types/Route";

const shoopingList: Route[] = [
  {
    method: "get",
    route: "/shoppingList",
    controller: ShoopingListController,
    action: "all",
    validation: [],
  },
  {
    method: "post",
    route: "/shoppingList/create",
    controller: ShoopingListController,
    action: "create",
    validation: [],
  },
  {
    method: "post",
    route: "/shoppingList/:id/edit",
    controller: ShoopingListController,
    action: "edit",
    validation: [],
  },
  {
    method: "delete",
    route: "/shoppingList/:id",
    controller: ShoopingListController,
    action: "remove",
    validation: [],
  },
  
];

export default shoopingList;

/**
 * @swagger
 * tags:
 *   name: Kontroler listy zakupów
 *   description: Operacje związane z zarządzaniem listą zakupów
 */

/**
 * @swagger
 * /shoppingList:
 *   get:
 *     summary: Pobieranie listy zakupów
 *     tags: [Kontroler listy zakupów]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich list zakupów
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /shoppingList/create:
 *   post:
 *     summary: Tworzenie nowej listy zakupów
 *     tags: [Kontroler listy zakupów]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Tu dodaj definicję pól dla nowej listy zakupów
 *     responses:
 *       '201':
 *         description: Utworzenie nowej listy zakupów
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /shoppingList/{id}/edit:
 *   post:
 *     summary: Edycja istniejącej listy zakupów
 *     tags: [Kontroler listy zakupów]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator listy zakupów
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Tu dodaj definicję pól do edycji listy zakupów
 *     responses:
 *       '200':
 *         description: Edycja istniejącej listy zakupów
 *       '400':
 *         description: Nieprawidłowe dane wejściowe lub identyfikator listy zakupów
 *       '404':
 *         description: Lista zakupów nie znaleziona
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /shoppingList/{id}:
 *   delete:
 *     summary: Usunięcie listy zakupów
 *     tags: [Kontroler listy zakupów]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identyfikator listy zakupów
 *     responses:
 *       '200':
 *         description: Usunięcie listy zakupów
 *       '400':
 *         description: Nieprawidłowy identyfikator listy zakupów
 *       '404':
 *         description: Lista zakupów nie znaleziona
 *       '500':
 *         description: Błąd serwera
 */

