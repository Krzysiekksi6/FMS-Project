import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/User";
import { InventoryItem } from "./InventoryItem";

@Entity("inventory")
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.inventory)
  user: User;

  @OneToMany(() => InventoryItem, (item) => item.inventory)
  items: InventoryItem[];
}
