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
