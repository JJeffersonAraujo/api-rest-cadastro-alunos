import { IsEmail, IsNotEmpty, IsOptional, IsDateString, IsString } from "class-validator";

export class RegisterAlunoDTO {

  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsDateString()
  data_nascimento?: string;
}