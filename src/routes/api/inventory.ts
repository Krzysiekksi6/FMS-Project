import { param } from "express-validator";
import Route from "../../types/Route";
import { InventoryController } from "../../controller/inventory/InventoryController";

const inventory: Route[] = [
  {
    method: "get",
    route: "/inventory",
    controller: InventoryController,
    validation: [],
    action: "all",
    secure: false,
  },
];

export default inventory;
