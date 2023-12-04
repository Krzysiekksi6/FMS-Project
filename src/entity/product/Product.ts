import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { InventoryItem } from "../inventory/InventoryItem";
import { Ingredient } from "../ingredient/Ingredient";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  calories: number;

  @Column()
  protein: number;

  @Column()
  carbs: number;

  @Column()
  fat: number;

  @Column()
  shelfLifeDays: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: "product_category_id" })
  productCategoryId: number;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.product)
  inventoryItems: InventoryItem[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product)
  ingredients: Ingredient[];
}
