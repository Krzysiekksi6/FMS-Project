import { param, body } from "express-validator";
import Route from "../../types/Route";
import { InventoryItemController } from "../../controller/inventory/InventoryItemController";

const inventoryItem: Route[] = [
  {
    method: "post",
    route: "/addItem",
    controller: InventoryItemController,
    validation: [
      body("inventoryId").isInt(),
      body("productId").isInt(),
      body("purchaseDate").optional(),
      body("expiryDate").optional(),
      body("quantity").isInt(),
    ],
    action: "addItem",
    secure: false,
  },
  {
    method: "get",
    route: "/getOneItem/:id",
    controller: InventoryItemController,
    validation: [param("id").isInt()],
    action: "getOneItem",
    secure: false,
  },
  {
    method: "get",
    route: "/getWastedFoodReport/:id",
    controller: InventoryItemController,
    validation: [param("id").isInt()],
    action: "getWastedFoodReport",
    secure: false,
  },

  {
    method: "get",
    route: "/getCurrentInventory/:inventoryId",
    controller: InventoryItemController,
    action: "getCurrentInventoryState",
    validation: [],
    secure: false,
  },
  {
    method: "put",
    route: "/editItem/:id",
    controller: InventoryItemController,
    validation: [
      param("id").isInt(),
      body("purchaseDate").optional().isISO8601(),
      body("expiryDate").optional().isISO8601(),
      body("quantity").optional().isInt(),
    ],
    action: "editItem",
    secure: false,
  },
  {
    method: "post",
    route: "/removeItem",
    controller: InventoryItemController,
    validation: [],
    action: "deleteItem",
    secure: false,
  },
  {
    method: "post",
    route: "/removeAllItem",
    controller: InventoryItemController,
    validation: [],
    action: "deleteFullItem",
    secure: false,
  },
  {
    method: "put",
    route: "/addItem",
    controller: InventoryItemController,
    validation: [],
    action: "incrementItem",
    secure: false,
  },
];

export default inventoryItem;
