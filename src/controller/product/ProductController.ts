import { Request, Response } from "express";
import { connectDatabase } from "../../config/connectDatabase";
import { Product } from "../../entity/product/Product";

export class ProductController {
  private productRepository = connectDatabase.getRepository(Product);

  async getAllProducts(req: Request, res: Response) {}

  async getOneProduct(req: Request, res: Response) {}

  async addProduct(req: Request, res: Response) {}

  async editOntProduct(req: Request, res: Response) {}

  async removeOneProduct(req: Request, res: Response) {}
}
