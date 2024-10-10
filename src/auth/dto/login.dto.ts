import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

// Validaciones para Autenticar un Usuario
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim()) // Elimina los espacios en blanco
    @IsString()
    @MinLength(6)
    password: string;
}