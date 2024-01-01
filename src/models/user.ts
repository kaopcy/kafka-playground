import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 100 })
    name: string;
}
