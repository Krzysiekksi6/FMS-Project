import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Product } from "../../entity/product/Product";
import { ProductCategory } from "../../entity/product/ProductCategory";

export class ProductController {
  private productRepository = connectDatabase.getRepository(Product);
  private productCategoryRepository =
    connectDatabase.getRepository(ProductCategory);

  async getAllProducts(req: Request, res: Response) {
    const products = await this.productRepository.find();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  }

  async getOneProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const product = await this.productRepository.findOneBy({
      id,
    });

    if (!product) {
      return res.status(404).json({ message: `Product ${id} not found` });
    }
    return res.status(200).json(product);
  }

  async addProduct(req: Request, res: Response) {
    const {
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      productCategoryId: categoryId,
    } = req.body;

    this.validProductData(
      res,
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      categoryId
    );
    const foundCategory = await this.productCategoryRepository.findOne({
      where: {
        id: categoryId,
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
      productCategoryId: categoryId,
    });

    const savedProduct = await this.productRepository.save(newProduct);
    return res.status(201).json(savedProduct);
  }

  async editProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const {
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      productCategoryId: categoryId,
    } = req.body;

    this.validProductData(
      res,
      name,
      calories,
      protein,
      carbs,
      fat,
      shelfLifeDays,
      categoryId
    );

    const foundProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!foundProduct) {
      return res
        .status(404)
        .json({ message: `Product with _id: ${id} not found` });
    }

    const foundCategory = await this.productCategoryRepository.findOne({
      where: {
        id: categoryId,
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
    foundProduct.productCategoryId = categoryId;

    const updatedProduct = await this.productRepository.update(
      id,
      foundProduct
    );
    return res.status(200).json(updatedProduct);
  }

  async removeProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const productToRemove = await this.productRepository.findOneBy({ id });
    if (!productToRemove) {
      return res
        .status(404)
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
    categoryId: number
  ) {
    if (
      !name ||
      !calories ||
      !protein ||
      !carbs ||
      !fat ||
      !shelfLifeDays ||
      !categoryId
    ) {
      return res.status(400).json({
        message: `Name, Caliories, Protein, Carbs, Fat, Shelf Life Days and Category Name are required!`,
      });
    }
  }
}
