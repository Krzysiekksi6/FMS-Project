import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Product } from "../../entity/product/Product";
import { ProductCategory } from "../../entity/product/ProductCategory";

export class ProductController {
  private productRepository = connectDatabase.getRepository(Product);
  private productCategoryRepository =
    connectDatabase.getRepository(ProductCategory);

  async getAllProducts(res: Response) {
    const products = await this.productRepository.find();
    if (!products) {
      return res.status(204).json({ message: "No products found" });
    }
    res.status(200).json(products);
  }

  async getOneProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      return res.status(204).json({ message: `Product ${id} not found` });
    }
  }

  async addProduct(req: Request, res: Response) {
    const { name, calories, protein, carbs, fat, shelfLifeDays, categoryName } =
      req.body;

    this.validProductData(
      res,
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      categoryName
    );
    const foundCategory = await this.productCategoryRepository.findOne({
      where: {
        name: categoryName.toLowerCase(),
      },
    });

    if (!foundCategory) {
      return res.status(404).json({ message: "Invalid category name" });
    }

    const newProduct = Object.assign(new Product(), {
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      productCategoryId: foundCategory.id,
    });

    const savedProduct = await this.productRepository.save(newProduct);
    return res.status(201).json(savedProduct);
  }

  async editProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { name, calories, protein, carbs, fat, shelfLifeDays, categoryName } =
      req.body;

    this.validProductData(
      res,
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      categoryName
    );

    const foundProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!foundProduct) {
      return res.status(404).json({ message: `Product ${id} not found` });
    }

    const foundCategory = await this.productCategoryRepository.findOne({
      where: {
        name: categoryName.toLowerCase(),
      },
    });

    if (!foundCategory) {
      return res.status(404).json({ message: "Invalid category name" });
    }

    foundProduct.name = name;
    foundProduct.calories = calories;
    foundProduct.protein = protein;
    foundProduct.carbs = carbs;
    foundProduct.fat = fat;
    foundProduct.shelfLifeDays = shelfLifeDays;
    foundProduct.productCategoryId = foundCategory;

    const updatedProduct = await this.productRepository.save(foundProduct);
    return res.status(200).json(updatedProduct);
  }

  async removeProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const productToRemove = await this.productRepository.findOneBy({ id });
    if (!productToRemove) {
      return res
        .status(204)
        .json({ message: `Product with _id:${id} not exist` });
    }
    const removedProduct = await this.productRepository.remove(productToRemove);

    return res.status(200).json({
      message: `Product with _id:${id} has been removed`,
      data: removedProduct,
    });
  }

  private validProductData(
    res: Response,
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    shelfLifeDays: number,
    categoryName: string
  ) {
    if (
      !name ||
      !calories ||
      !protein ||
      !carbs ||
      !fat ||
      !shelfLifeDays ||
      !categoryName
    ) {
      return res.status(400).json({
        message: `Name, Caliories, Protein, Carbs, Fat, Shelf Life Days and Category Name are required!`,
      });
    }
  }
}
