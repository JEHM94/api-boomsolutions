import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

// Decoradores para documentación de API
@ApiTags('Product')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized Bearer Auth' })
//
@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  // Decoradores para documentación de API
  @ApiCreatedResponse({ description: 'Producto registrado exitosamente' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
