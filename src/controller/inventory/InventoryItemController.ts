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
    const calculateExpiryDate = expiryDate
      ? expiryDate
      : addDays(calculatePurchaseDate, product.shelfLifeDays);
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
  async getOneItem(req: Request, res: Response) {
    const itemId = parseInt(req.params.id);

    try {
      const inventoryItem = await this.inventoryItemRepository.findOne({
        where: {
          id: itemId,
        },
        relations: {
          product: true,
        },
      });

      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: `Inventory item with _id: ${itemId} not found!` });
      }

      return res.status(200).json(inventoryItem);
    } catch (error) {
      console.error("Error getting inventory item:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async editItem(req: Request, res: Response) {
    const itemId = parseInt(req.params.id);
    const { purchaseDate, expiryDate, quantity } = req.body;

    try {
      let inventoryItem = await this.inventoryItemRepository.findOne({
        where: {
          id: itemId,
        },
        relations: {
          product: true,
        },
      });

      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: `Inventory item with _id: ${itemId} not found!` });
      }

      // Tutaj możesz dodać dodatkową logikę edycji, na przykład sprawdzając, czy przedmiot jest używany gdzie indziej

      inventoryItem.purchaseDate = purchaseDate || inventoryItem.purchaseDate;
      inventoryItem.expiryDate = expiryDate || inventoryItem.expiryDate;
      inventoryItem.quantity = quantity || inventoryItem.quantity;

      inventoryItem = await this.inventoryItemRepository.save(inventoryItem);

      return res.status(200).json(inventoryItem);
    } catch (error) {
      console.error("Error editing inventory item:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async removeItem(req: Request, res: Response) {
    const itemId = parseInt(req.params.id);

    try {
      const inventoryItem = await this.inventoryItemRepository.findOne({
        where: {
          id: itemId,
        },
        relations: {
          product: true,
        },
      });

      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: `Inventory item with _id: ${itemId} not found!` });
      }

      // Tutaj możesz dodać dodatkową logikę, na przykład sprawdzając, czy przedmiot jest używany gdzie indziej przed usunięciem

      await this.inventoryItemRepository.remove(inventoryItem);

      return res
        .status(200)
        .json({ message: "Inventory item removed successfully!" });
    } catch (error) {
      console.error("Error removing inventory item:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
