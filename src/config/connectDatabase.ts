import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user/User";
import config from "../config";
import { UserDetails } from "../entity/user/UserDetails";
import { Product } from "../entity/product/Product";
import { ProductCategory } from "../entity/product/ProductCategory";
import { Inventory } from "../entity/inventory/Inventory";
import { InventoryItem } from "../entity/inventory/InventoryItem";
export const connectDatabase = new DataSource({
  type: "postgres",
  host: "localhost",
  port: config.pg_port,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [
    User,
    UserDetails,
    Product,
    ProductCategory,
    Inventory,
    InventoryItem,
  ],
  migrations: [],
  subscribers: [],
});
