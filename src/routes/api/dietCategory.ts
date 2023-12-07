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
