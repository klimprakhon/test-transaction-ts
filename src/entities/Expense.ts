import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";
import { Category } from "./Category";
import { User } from "./User";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => Account)
  account: Account;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  slipPath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
