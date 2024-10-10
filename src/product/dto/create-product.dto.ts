import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min } from "class-validator";

// Validaciones para la creación de nuevos Productos
export class CreateProductDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @Min(0)
    @IsNotEmpty()
    stock: number;

}
