import { Transform } from "class-transformer";
import { IsEmail, isEmail, isNotEmpty, IsNotEmpty, IsOptional, isString, IsString, MinLength } from "class-validator";

// Validaciones para la creación de nuevos usuarios
export class RegisterDto {

    @Transform(({ value }) => value.trim()) // Elimina los espacios en blanco
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim()) // Elimina los espacios en blanco
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    role?: string;
}