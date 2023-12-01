import { param, body } from "express-validator";
import Route from "../../types/Route";
import { InventoryItemController } from "../../controller/inventory/InventoryItemController";

const inventoryItem: Route[] = [
  {
    method: "post",
    route: "/addItem",
    controller: InventoryItemController,
    validation: [
      
    ],
    action: "addItem",
    secure: false,
  },
];

export default inventoryItem;
