import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WeeklyDiet } from "./WeeklyDiet";
import { DietCategory } from "./DietCategory";

@Entity("diet")
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "duration_weeks" })
  durationWeeks: number;

  @Column({ name: "calories_per_day" })
  caloriesPerDay: number;

  @OneToMany(() => WeeklyDiet, (weeklyDiet) => weeklyDiet.diet)
  weeklyDiets: WeeklyDiet[];

  @ManyToOne(() => DietCategory, (dietCategory) => dietCategory.diets)
  dietCategory: DietCategory;

  

}
