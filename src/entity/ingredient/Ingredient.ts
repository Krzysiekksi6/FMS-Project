import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "../dish/Dish";
import { Product } from "../product/Product";

@Entity("ingredient")
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Dish, (dish) => dish.ingredients)
  dish: Dish;

  @ManyToOne(() => Product, (product) => product.ingredients)
  product: Product;

  @Column()
  quantity: number;
}