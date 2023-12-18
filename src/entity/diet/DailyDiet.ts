import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { WeeklyDiet } from "./WeeklyDiet";
import { DailyMeal } from "./DailyMeal";

@Entity()
export class DailyDiet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WeeklyDiet, (weeklyDiet) => weeklyDiet.dailyDiets)
  @JoinColumn({ name: "weekly_diet_id" })
  weeklyDiet: WeeklyDiet;

  @Column({ name: "day_of_week" })
  dayOfWeek: string;

  @Column()
  date: Date;

  @Column({ name: "total_calories" })
  totalCalories: number;

  @Column({ name: "total_protein" })
  totalProtein: number;

  @Column({ name: "total_carbs" })
  totalCarbs: number;

  @Column({ name: "total_fat" })
  totalFat: number;

  @OneToMany(() => DailyMeal, (dailyMeal) => dailyMeal.dailyDiet, { cascade: true })
  dailyMeals: DailyMeal[];

}
