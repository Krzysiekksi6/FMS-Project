import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user/User";
import config from "../config";
import { UserDetails } from "../entity/user/UserDetails";
import { Product } from "../entity/product/Product";
import { ProductCategory } from "../entity/product/ProductCategory";
import { Inventory } from "../entity/inventory/Inventory";
import { InventoryItem } from "../entity/inventory/InventoryItem";
import { Ingredient } from "../entity/ingredient/Ingredient";
import { Dish } from "../entity/dish/Dish";
import { Diet } from "../entity/diet/Diet";
import { DietCategory } from "../entity/diet/DietCategory";
import { WeeklyDiet } from "../entity/diet/WeeklyDiet";
import { DailyDiet } from "../entity/diet/DailyDiet";
import { DailyMeal } from "../entity/diet/DailyMeal";
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
    Ingredient,
    Diet,
    Dish,
    DietCategory,
    WeeklyDiet,
    DailyDiet,
    DailyMeal,
  ],
  migrations: [],
  subscribers: [],
});
