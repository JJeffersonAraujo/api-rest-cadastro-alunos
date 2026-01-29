import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  senha!: string;
}
