import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Inventory } from "../../entity/inventory/Inventory";

export class InventoryController {
  private inventoryRepository = connectDatabase.getRepository(Inventory);

  async all(req: Request, res: Response) {
    const items = await this.inventoryRepository.find();

    if (!items) {
      return res.status(404).json({ message: `No inventory found` });
    }
  }
}
