import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Diet } from "../diet/Diet";
@Entity("user_details")
export class UserDetails {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  chestCircumference: number;

  @Column()
  waistCircumference: number;

  @Column()
  hipCircumference: number;

  @Column()
  armCircumference: number;

  @Column()
  thighCircumference: number;

  @Column()
  calfCircumference: number;

  @Column({ type: "float4", nullable: true })
  bmi: number;

  @Column({ type: "float4", nullable: true })
  bmr: number;

  @OneToOne(() => Diet)
  @JoinColumn({ name: "current_diet_id" })
  currentDiet: Diet;
}
