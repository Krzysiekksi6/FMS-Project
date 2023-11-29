import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { ProductCategory } from "../../entity/product/ProductCategory";

export class ProductCategoryController {
  private productCategoryRepository =
    connectDatabase.getRepository(ProductCategory);

  async getAllCategories(req: Request, res: Response) {
    const categories = await this.productCategoryRepository.find();
    if (!categories) {
      return res.status(404).json({ message: "No categories found!" });
    }
    res.status(200).json(categories);
  }

  async getOneCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const category = await this.productCategoryRepository.findOneBy({ id });
    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with _id ${id} not found` });
    }
    return res.status(200).json(category);
  }
  async addCategory(req: Request, res: Response) {
    const { name } = req.body;
    this.validCategoryData(res, name);
    const newCategory = Object.assign(new ProductCategory(), {
      name,
    });

    const savedCategory = await this.productCategoryRepository.save(
      newCategory
    );
    return res.status(201).json(savedCategory);
  }
  async editCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    this.validCategoryData(res, name);
    const foundCategory = await this.productCategoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!foundCategory) {
      return res
        .status(404)
        .json({ message: `Category with _id: ${id} not found` });
    }

    foundCategory.name = name;
    await this.productCategoryRepository.update(
      id,
      foundCategory
    );
    return res.status(200).json(foundCategory);
  }
  async removeCategory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const categoryToRemove = await this.productCategoryRepository.findOneBy({
      id,
    });

    if (!categoryToRemove) {
      return res
        .status(404)
        .json({ message: `Category with _id:${id} not exist` });
    }

    const removedCategory = await this.productCategoryRepository.remove(
      categoryToRemove
    );
    return res.status(200).json(removedCategory);
  }

  private validCategoryData(res: Response, name: string) {
    if (!name) {
      return res.status(400).json({ message: "Invalid data, required string" });
    }
  }
}
