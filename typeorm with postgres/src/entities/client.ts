import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Banker } from "./banker";
import { Transaction } from "./transaction";
import { Person } from "./utils/person";

@Entity("client")
export class Client extends Person {
  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair: string;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_member: string;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];
}
