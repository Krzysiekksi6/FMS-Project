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
