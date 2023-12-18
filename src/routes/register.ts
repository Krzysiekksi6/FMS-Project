import { body } from "express-validator";
import { RegisterController } from "../controller/RegisterController";
import Route from "../types/Route";

/**
 * @swagger
 * tags:
 *   name: Kontroler autoryzacji
 *   description: Operacje związane z uwierzytelnianiem, odświeżaniem, logowaniem i rejestracją użytkowników
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Logowanie użytkownika wraz z uwierzytelnianiem
 *     tags: [Kontroler autoryzacji]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Udane uwierzytelnienie
 *         content:
 *           application/json:
 *             example:
 *               message: Użytkownik pomyślnie uwierzytelniony
 *               accessToken: <JWT token dostępu>
 *               roles: ['admin', 'user']
 *               firstname: John
 *               id: 1
 *               userDetails:
 *                 prop1: wartość1
 *                 prop2: wartość2
 *       '401':
 *         description: Nieautoryzowany dostęp
 *         content:
 *           application/json:
 *             example:
 *               message: Nieautoryzowany dostęp
 *       '400':
 *         description: Złe żądanie
 *         content:
 *           application/json:
 *             example:
 *               message: Wymagane są nazwa użytkownika i hasło
 */

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Odświeżanie tokena dostępu
 *     tags: [Kontroler autoryzacji]
 *     responses:
 *       '200':
 *         description: Odświeżenie tokena zakończone sukcesem
 *         content:
 *           application/json:
 *             example:
 *               accessToken: <Nowy JWT token dostępu>
 *       '401':
 *         description: Nieautoryzowany dostęp lub brak tokenu do odświeżania
 *       '403':
 *         description: Token odświeżania jest nieważny lub użytkownik nie istnieje
 */

/**
 * @swagger
 * /logowanie:
 *   get:
 *     summary: Wylogowywanie użytkownika wraz z usunięciem tokena
 *     tags: [Kontroler autoryzacji]
 *     responses:
 *       '204':
 *         description: Sukces wylogowania
 *       '400':
 *         description: Brak tokenu do wylogowania lub nieautoryzowany dostęp
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Kontroler autoryzacji]
 *     summary: Obsługuje rejestrację nowego użytkownika
 *     description: Zarejestruj nowego użytkownika na podstawie dostarczonych informacji.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Użytkownik zarejestrowany pomyślnie
 *       400:
 *         description: Nieprawidłowe dane wejściowe lub brak wymaganych pól
 *       409:
 *         description: Użytkownik o takim samym nazwie użytkownika już istnieje
 */

const register: Route[] = [
  {
    method: "post",
    route: "/register",
    controller: RegisterController,
    action: "handleNewUser",
    validation: [
      body("firstname").isString(),
      body("lastname").isString(),
      body("username").isString(),
      body("password").isString(),
    ],
  },
];

export default register;
