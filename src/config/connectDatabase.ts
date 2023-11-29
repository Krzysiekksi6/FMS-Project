import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user/User";
import config from "../config";
import { UserDetails } from "../entity/user/UserDetails";
import { Product } from "../entity/product/Product";
import { ProductCategory } from "../entity/product/ProductCategory";
export const connectDatabase = new DataSource({
  type: "postgres",
  host: "localhost",
  port: config.pg_port,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, UserDetails, Product, ProductCategory],
  migrations: [],
  subscribers: [],
});
