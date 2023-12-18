import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { UserDetails } from "./UserDetails";
import { UserRole } from "../../enums/UserRole";
import { Inventory } from "../inventory/Inventory";

@Entity("user")
export class User {
  // @PrimaryGeneratedColumn("uuid")
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: UserRole,
    array: true,
    default: [UserRole.USER],
  })
  roles: UserRole[];

  @OneToOne(() => Inventory, { cascade: true, eager: true })
  @JoinColumn()
  inventory: Inventory;

  @OneToOne(() => UserDetails, { cascade: true, eager: true })
  @JoinColumn()
  user_details: UserDetails;
}
