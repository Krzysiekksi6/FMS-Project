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
    console.log(dishes);

    const ingredients = await this.ingredientRepository.find({
      relations: ["product", "dish"],
    });

    console.log(ingredients);

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

    return res.status(200).json(dish);

  }

  async addDish(req: Request, res: Response) {
    const { name, description, ingredients } = req.body;

    try {
      // Zapisz składniki do bazy danych
      const savedIngredients = await Promise.all(
        ingredients.map(async (ingredientData) => {
          const { productId, quantity } = ingredientData;

          // Znajdź produkt na podstawie productId
          const product = await this.productRepository.findOne({
            where: { id: productId },
          });

          if (!product) {
            return res
              .status(404)
              .json({ message: `Product with id ${productId} not found` });
          }

          // Utwórz nową instancję składnika
          const newIngredient = this.ingredientRepository.create({
            product,
            quantity,
          });

          // Zapisz nowy składnik do bazy danych
          return this.ingredientRepository.save(newIngredient);
        })
      );

      // Utwórz nową instancję dania
      const newDish = this.dishRepository.create({
        name,
        description,
        ingredients: savedIngredients,
      });

      // Zapisz nowe danie wraz ze składnikami
      const savedDish = await this.dishRepository.save(newDish);

      return res
        .status(201)
        .json({ message: "Dish added successfully", dish: savedDish });
    } catch (error) {
      console.error("Error in addDish:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
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
