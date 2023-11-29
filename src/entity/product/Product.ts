import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./ProductCategory";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  calories: number;

  @Column()
  protein: number;

  @Column()
  carbs: number;

  @Column()
  fat: number;

  @Column()
  shelfLifeDays: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({name: "product_category_id"})
  productCategoryId: ProductCategory;
}
