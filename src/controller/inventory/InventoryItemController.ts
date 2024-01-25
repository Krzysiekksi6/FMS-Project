import { Request, Response, response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Inventory } from "../../entity/inventory/Inventory";
import { InventoryItem } from "../../entity/inventory/InventoryItem";
import { Product } from "../../entity/product/Product";
import { addDays, differenceInDays, parseISO } from "date-fns";
import { In } from "typeorm";

export class InventoryItemController {
  private inventoryRepository = connectDatabase.getRepository(Inventory);
  private productRepository = connectDatabase.getRepository(Product);
  private inventoryItemRepository =
    connectDatabase.getRepository(InventoryItem);

  private calculateDaysDifference = (startDate, endDate) => {
    console.log(differenceInDays(endDate, startDate));
    return differenceInDays(endDate, startDate);
  };

  async addItem(req: Request, res: Response) {
    const { inventoryId, productId, purchaseDate, expiryDate, quantity, unit } =
      req.body;
    const inventory = await this.inventoryRepository.findOne({
      where: {
        id: inventoryId,
      },
      relations: {
        items: true,
      },
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

    console.log("ID PROD", productId);
    console.log("CAL PROD", product);

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
    inventoryItem.unit = unit;

    inventory.items.push(inventoryItem);

    const savedInventoryItem = await this.inventoryItemRepository.save(
      inventoryItem
    );

    const saved = await this.inventoryRepository.save(inventory);

    return res.status(201).json({ saved, savedInventoryItem });
  }

  async getOneItem(req: Request, res: Response) {
    const { inventoryId, productId } = req.body;
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: {
        items: true,
      },
    });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with _id: ${inventoryId} not found!` });
    }

    const foundItem = inventory.items.find((item) => item.id == productId);
    console.log("Founded ", foundItem);
    if (!foundItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with id: ${productId} not found!` });
    }

    return res.status(200).json(foundItem);
  }

  async editItem(req: Request, res: Response) {
    const { inventoryId, productId, newValues } = req.body;
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: {
        items: true,
      },
    });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with _id: ${inventoryId} not found!` });
    }

    const foundItem = inventory.items.find((item) => item.id == productId);
    console.log("Founded ", foundItem);
    if (!foundItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with id: ${productId} not found!` });
    }
    if (newValues.purchaseDate) {
      foundItem.purchaseDate = newValues.purchaseDate;
    }

    if (newValues.expiryDate) {
      foundItem.expiryDate = newValues.expiryDate;
    }

    if (newValues.quantity) {
      foundItem.quantity = newValues.quantity;
    }
    const updatedItem = await this.inventoryItemRepository.save(foundItem);

    return res.status(200).json({ updatedItem });
  }

  async incrementItem(req: Request, res: Response) {
    const { inventoryId, productId } = req.body;
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: {
        items: true,
      },
    });

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with _id: ${inventoryId} not found!` });
    }

    const foundItem = inventory.items.find((item) => item.id == productId);

    if (!foundItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with id: ${productId} not found!` });
    }

    foundItem.quantity += 1;
    await this.inventoryItemRepository.save(foundItem);
  }

  async getWastedFoodReport(req: Request, res: Response) {
    const inventoryId = parseInt(req.params.id);

    try {
      const inventory = await this.inventoryRepository.findOne({
        where: { id: inventoryId },
        relations: {
          items: true,
        },
      });

      if (!inventory) {
        return res
          .status(404)
          .json({ message: `Inventory with _id: ${inventoryId} not found!` });
      }

      const wastedFood = inventory.items.filter(
        (item) =>
          this.calculateDaysDifference(item.purchaseDate, item.expiryDate) < 0
      );

      if (wastedFood.length === 0) {
        return res
          .status(200)
          .json({ message: "No wasted food :)", wastedFood });
      } else {
        const productIds = wastedFood.map((item) => item.id);
        const products = await this.productRepository.find({
          where: { id: In(productIds) },
        });

        const wastedFoodWithProducts = wastedFood.map((item) => {
          const product = products.find((p) => p.id === item.id);
          return {
            ...item,
            productName: product ? product.name : "Unknown Product",
          };
        });

        return res.status(200).json(wastedFoodWithProducts);
      }
    } catch (error) {
      console.error("Error getting wasted food report:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteItem(req: Request, res: Response) {
    const { inventoryId, productId } = req.body;

    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: {
        items: true,
      },
    });

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with _id: ${inventoryId} not found!` });
    }

    const foundItem = inventory.items.find((item) => item.id == productId);

    if (!foundItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with id: ${productId} not found!` });
    }

    if (foundItem.quantity > 1) {
      foundItem.quantity -= 1;
      await this.inventoryItemRepository.save(foundItem);
    } else {
      await this.inventoryItemRepository.remove(foundItem);
    }

    return res
      .status(200)
      .json({ message: "Inventory item deleted successfully" });
  }

  async deleteFullItem(req: Request, res: Response) {
    const { inventoryId, productId } = req.body;

    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: {
        items: true,
      },
    });

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with _id: ${inventoryId} not found!` });
    }

    const foundItem = inventory.items.find((item) => item.id == productId);

    if (!foundItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with id: ${productId} not found!` });
    }

    const respnose = await this.inventoryItemRepository.remove(foundItem);

    return res.status(201).json(response)
  }
  async getCurrentInventoryState(req: Request, res: Response) {
    const { inventoryId } = req.params;

    const inventory = await this.inventoryRepository
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.items", "inventory_item")
      .leftJoinAndSelect("inventory_item.product", "product")
      .leftJoinAndSelect("product.productCategory", "product_category") // Dodane left join z tabelą ProductCategory
      .where("inventory.id = :id", { id: inventoryId })
      .getOne();

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with id: ${inventoryId} not found!` });
    }

    return res.status(200).json({ inventory });
  }
}
