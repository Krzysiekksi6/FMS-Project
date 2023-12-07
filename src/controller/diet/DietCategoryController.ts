import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { DietCategory } from "../../entity/diet/DietCategory";

export class DietCategoryController {
  private dietCategoryRepository = connectDatabase.getRepository(DietCategory);

  async getAllDietCategories(req: Request, res: Response) {
    try {
      const dietCategories = await this.dietCategoryRepository.find();
      return res.json(dietCategories);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getDietCategoryById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const dietCategory = await this.dietCategoryRepository.findOne({
        where: { id },
      });

      if (!dietCategory) {
        return res.status(404).json({ message: "DietCategory not found" });
      }

      return res.json(dietCategory);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createDietCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const newDietCategory = this.dietCategoryRepository.create({
        name,
        description,
      });

      const savedDietCategory = await this.dietCategoryRepository.save(
        newDietCategory
      );

      return res.status(201).json(savedDietCategory);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateDietCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;

    try {
      const dietCategory = await this.dietCategoryRepository.findOne({
        where: { id },
      });

      if (!dietCategory) {
        return res.status(404).json({ message: "DietCategory not found" });
      }

      dietCategory.name = name;
      dietCategory.description = description;

      const updatedDietCategory = await this.dietCategoryRepository.save(
        dietCategory
      );

      return res.json(updatedDietCategory);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async deleteDietCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      const dietCategory = await this.dietCategoryRepository.findOne({
        where: {
          id,
        },
      });

      if (!dietCategory) {
        return res.status(404).json({ message: "DietCategory not found" });
      }

      await this.dietCategoryRepository.remove(dietCategory);

      return res.json({ message: "DietCategory deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
