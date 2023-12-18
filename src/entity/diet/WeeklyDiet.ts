import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Diet } from "./Diet";
import { DailyDiet } from "./DailyDiet";

@Entity()
export class WeeklyDiet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "week_name", nullable: true })
  weekName: string;

  @OneToMany(() => DailyDiet, (dailyDiet) => dailyDiet.weeklyDiet)
  dailyDiets: DailyDiet[];

  @ManyToOne(() => Diet, (diet) => diet.weeklyDiets)
  diet: Diet;
}
