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
