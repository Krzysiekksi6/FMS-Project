import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { UserDetails } from "./UserDetails";

export enum UserRole {
  USER = "User",
  MODERATOR = "Moderator",
  ADMIN = "Admin",
}

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

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => UserDetails)
  @JoinColumn()
  user_details: UserDetails;
}
