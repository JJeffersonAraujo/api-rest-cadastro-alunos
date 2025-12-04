import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaAlunos1764884147799 implements MigrationInterface {
    name = 'CriarTabelaAlunos1764884147799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alunos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "data_nascimento" date, CONSTRAINT "PK_0090f2d8573e71e8e4e274db905" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "alunos"`);
    }

}
