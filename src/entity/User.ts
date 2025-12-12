import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type : 'varchar', length: 100, nullable: false})
    name!: string;

    @Column({type : 'varchar', length: 150, unique: true, nullable: false})
    email!: string; 

    @Column({type : 'varchar', length: 255, nullable: false})
    senha!: string;

    @CreateDateColumn()
    cretedAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}