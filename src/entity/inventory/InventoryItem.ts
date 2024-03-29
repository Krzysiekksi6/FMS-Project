import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventory } from "./Inventory";
import { Product } from "../product/Product";
import { Units } from "../../enums/Units";

@Entity("inventory_item")
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.items)
  @JoinColumn({ name: "inventory_id" })
  inventory: Inventory;

  @ManyToOne(() => Product, (product) => product.inventoryItems)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  purchaseDate: Date;

  @Column()
  expiryDate: Date;

  @Column()
  quantity: number;

  @Column({ default: 0 })
  usedQuantity: number;

  @Column({
    type: "enum",
    enum: Units,
    array: false,
    default: Units.PIECE,
  })
  unit: Units;

  @Column({ nullable: true })
  lastUsedDate: Date;

  @Column({ type: "text", nullable: true })
  additionalInformation: string;
}
