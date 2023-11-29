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
    route: "/product",
    controller: ProductController,
    action: "addProduct",
    validation: [body("name").isString],
    secure: false,
    // roles: []
  },
  {
    method: "put",
    route: "/product/:id/edit",
    controller: ProductController,
    action: "editProduct",
    validation: [param("id").isInt(), body("name").isString],
    secure: false,
    // roles: []
  },
  {
    method: "delete",
    route: "/product/:id/delete",
    controller: ProductController,
    action: "productToRemove",
    validation: [param("id").isInt()],
    secure: false,
    // roles: []
  },
];

export default products;

// {
//     method: "",
//     route: "/",
//     controller: ,
//     action: "",
//     validation: [],
//     secure: false,
//     // roles: []

// }
