import { param, body } from "express-validator";
import Route from "../../types/Route";
import { DietController } from "../../controller/diet/DietController";

const diet: Route[] = [
  {
    method: "get",
    route: "/diet",
    controller: DietController,
    action: "getAllDiets",
    validation: [],
    secure: false,
  },
  {
    method: "post",
    route: "/diet",
    controller: DietController,
    action: "createDiet",
    validation: [],
    secure: false,
  },
  {
    method: "post",
    route: "/add-day-to-week",
    controller: DietController,
    action: "addDayToWeek",
    validation: [
      body("weeklyDietId").isInt(),
      body("dayOfWeek").isString(),
      body("date").isDate(),
      body("totalCalories").isFloat(),
      body("totalProtein").isFloat(),
      body("totalCarbs").isFloat(),
      body("totalFat").isFloat(),
    ],
    secure: false,
  },
  {
    method: "post",
    route: "/add-meal-to-day",
    controller: DietController,
    action: "addMealToDay",
    validation: [
      body("dailyDietId").isInt(),
     
      body("dishIds").isArray().notEmpty(),
    ],
    secure: false,
  },
];

export default diet;

/**
 * @swagger
 * tags:
 *   name: Kontroler planów żywieniowych
 *   description: Operacje związane z zarządzaniem dietami
 */

/**
 * @swagger
 * /diet:
 *   get:
 *     summary: Pobieranie wszystkich dostępnych diet
 *     tags: [Kontroler planów żywieniowych]
 *     responses:
 *       '200':
 *         description: Pobranie listy wszystkich diet
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /diet:
 *   post:
 *     summary: Tworzenie nowej diety
 *     tags: [Kontroler planów żywieniowych]
 *     responses:
 *       '201':
 *         description: Utworzenie nowej diety
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /add-day-to-week:
 *   post:
 *     summary: Dodawanie nowego dnia do tygodnia diety
 *     tags: [Kontroler planów żywieniowych]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weeklyDietId:
 *                 type: integer
 *               dayOfWeek:
 *                 type: string
 *               date:
 *                 type: date
 *               totalCalories:
 *                 type: float
 *               totalProtein:
 *                 type: float
 *               totalCarbs:
 *                 type: float
 *               totalFat:
 *                 type: float
 *     responses:
 *       '200':
 *         description: Dodanie nowego dnia do tygodnia diety
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

/**
 * @swagger
 * /add-meal-to-day:
 *   post:
 *     summary: Dodawanie posiłku do dnia diety
 *     tags: [Kontroler planów żywieniowych]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dailyDietId:
 *                 type: integer
 *               dishIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       '200':
 *         description: Dodanie posiłku do dnia diety
 *       '400':
 *         description: Nieprawidłowe dane wejściowe
 *       '500':
 *         description: Błąd serwera
 */

