import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CreateUser } from "./type";



@Entity({ name: "users" })
export class User implements CreateUser {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    picture: string;
}
