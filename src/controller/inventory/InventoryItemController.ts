import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Inventory } from "../../entity/inventory/Inventory";
import { InventoryItem } from "../../entity/inventory/InventoryItem";
import { Product } from "../../entity/product/Product";
import { addDays } from "date-fns";

export class InventoryItemController {
  private inventoryRepository = connectDatabase.getRepository(Inventory);
  private inventoryItemRepository =
    connectDatabase.getRepository(InventoryItem);
  private productRepository = connectDatabase.getRepository(Product);

  async addItem(req: Request, res: Response) {
    console.log("POSTING");
    const { inventoryId, productId, purchaseDate, expiryDate, quantity } =
      req.body;
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: ["items"],
    });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with _id: ${inventoryId} not found!` });
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with _id: ${productId} not found!` });
    }

    const calculatePurchaseDate = purchaseDate ? purchaseDate : new Date();
    const calculateExpiryDate = expiryDate? expiryDate : addDays(
      calculatePurchaseDate,
      product.shelfLifeDays
    );
    const inventoryItem = new InventoryItem();
    inventoryItem.product = product;
    inventoryItem.purchaseDate = calculatePurchaseDate;
    inventoryItem.expiryDate = calculateExpiryDate;
    inventoryItem.quantity = quantity;
    inventoryItem.usedQuantity = 0;

    inventory.items.push(inventoryItem);

    await this.inventoryRepository.save(inventory);

    return res.status(201).json(inventoryItem);
  }
}
