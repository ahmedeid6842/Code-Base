import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { Client } from "./client";

import { Person } from "./utils/person";

@Entity("banker")
export class Banker extends Person {
  @ManyToMany(() => Client)
  @JoinTable({
    name: "bankers_clients",
    joinColumn: {
      name: "banker",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
  })
  clients: Client[];

  @Column({
    unique: true,
    length: 10,
  })
  employee_number: string;
}
