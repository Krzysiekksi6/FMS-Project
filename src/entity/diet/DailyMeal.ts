import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { DailyDiet } from "./DailyDiet";
import { Dish } from "../dish/Dish";
import { MealType } from "../../enums/Meal";

@Entity()
export class DailyMeal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DailyDiet, (dailyDiet) => dailyDiet.dailyMeals)
  @JoinTable({ name: "daily_diet_meals" })
  dailyDiet: DailyDiet;

  @Column({ name: "meal_type", type: "enum", enum: MealType })
  mealType: MealType;

  @ManyToMany(() => Dish, { cascade: true })
  @JoinTable({
    name: "daily_meal_dishes",
    joinColumn: { name: "daily_meal_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "dish_id", referencedColumnName: "id" },
  })
  dishes: Dish[];
}
