import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryItem } from "./InventoryItem";

@Entity("inventory")
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => InventoryItem, (item) => item.inventory)
  items: InventoryItem[];
}
