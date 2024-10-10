import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

// Validaciones para la edición de un producto, Hereda las validaciones de CreateProductDto y las coloca de forma "Opcional"
export class UpdateProductDto extends PartialType(CreateProductDto) {}
