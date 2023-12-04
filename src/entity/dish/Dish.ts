import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "../ingredient/Ingredients";

@Entity("dish")
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.dish)
  ingredients: Ingredient[];
}
