import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Diet } from "./Diet";

@Entity()
export class DietCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Diet, (diet) => diet.dietCategory)
  diets: Diet[];
}
