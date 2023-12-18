import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Dish } from "../../entity/dish/Dish";
import { Ingredient } from "../../entity/ingredient/Ingredient";
import { Product } from "../../entity/product/Product";
export class DishController {
  private dishRepository = connectDatabase.getRepository(Dish);
  private ingredientRepository = connectDatabase.getRepository(Ingredient);
  private productRepository = connectDatabase.getRepository(Product);

  async getAllDishes(req: Request, res: Response) {
    const dishes = await this.dishRepository.find({
      relations: {
        ingredients: {
          product: true,
        },
      },
    });

    if (!dishes) {
      return res.status(404).json({ message: "No dishes found!" });
    }

    return res.status(200).json(dishes);
  }

  async getDishById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const dish = await this.dishRepository.findOne({
      where: { id },
      relations: {
        ingredients: {
          product: true,
        },
      },
    });

    if (!dish) {
      return res.status(404).json({ message: `Dish with _id:${id} not exist` });
    }
  }

  async addDish(req: Request, res: Response) {
    const { name, description, ingredients } = req.body;

    const newDish = this.dishRepository.create({ name, description });

    if (ingredients && ingredients.length > 0) {
      for (const ingredientData of ingredients) {
        const { productId, quantity } = ingredientData;

        const product = await this.productRepository.findOne({
          where: { id: productId },
        });

        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with id ${productId} not found` });
        }

        const newIngredient = this.ingredientRepository.create({
          dish: newDish,
          product,
          quantity,
        });

        newDish.ingredients = [...(newDish.ingredients || []), newIngredient];
      }
    }

    const savedDish = await this.dishRepository.save(newDish);

    return res
      .status(201)
      .json({ message: "Dish added successfully", dish: savedDish });
  }

  async deleteDish(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const dishToRemove = await this.dishRepository.findAndCountBy({ id });

    if (!dishToRemove) {
      return res.status(404).json({ message: `Dish with _id:${id} not exist` });
    }

    return res
      .status(200)
      .json({ message: `Dish with _id:${id} has been removed!` });
  }
}
