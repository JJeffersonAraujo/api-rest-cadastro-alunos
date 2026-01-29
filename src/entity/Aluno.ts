import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("alunos")
export class Aluno {

  @PrimaryGeneratedColumn()
  id!: number; // ID é gerado automaticamente

  @Column()
  nome!: string;

  @Column()
  email!: string;

  @Column({ type: "date", nullable: true })
  data_nascimento?: string; // opcional
}
