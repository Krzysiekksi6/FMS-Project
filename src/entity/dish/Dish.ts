import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
} from "typeorm";
import { Ingredient } from "../ingredient/Ingredient";

@Entity("dish")
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;

  @Column({ type: "float", default: 0 })
  totalCalories: number;

  @Column({ type: "float", default: 0 })
  totalProtein: number;

  @Column({ type: "float", default: 0 })
  totalCarbs: number;

  @Column({ type: "float", default: 0 })
  totalFat: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.dish)
  ingredients: Ingredient[];

  // Getter dla obliczonych pól
  get getTotalCalories(): number {
    return (
      this.ingredients?.reduce(
        (acc, ingredient) =>
          acc + (ingredient.product?.calories || 0) * ingredient.quantity,
        0
      ) || 0
    );
  }

  get getTotalProtein(): number {
    return (
      this.ingredients?.reduce(
        (acc, ingredient) =>
          acc + (ingredient.product?.protein || 0) * ingredient.quantity,
        0
      ) || 0
    );
  }

  get getTotalCarbs(): number {
    return (
      this.ingredients?.reduce(
        (acc, ingredient) =>
          acc + (ingredient.product?.carbs || 0) * ingredient.quantity,
        0
      ) || 0
    );
  }

  get getTotalFat(): number {
    return (
      this.ingredients?.reduce(
        (acc, ingredient) =>
          acc + (ingredient.product?.fat || 0) * ingredient.quantity,
        0
      ) || 0
    );
  }

  @AfterInsert()
  @AfterUpdate()
  updateTotals() {
    this.totalCalories = this.getTotalCalories;
    this.totalProtein = this.getTotalProtein;
    this.totalCarbs = this.getTotalCarbs;
    this.totalFat = this.getTotalFat;
  }
}
